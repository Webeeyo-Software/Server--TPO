import { Request, Response } from "express";
import db from "../../models";  // adjust path as per your project

const AddressDetails = db.AddressDetails;

export const createAddressDetails = async (req: Request, res: Response) => {
  try {
    const {
      registrationNo,
      localAddress,
      permanentAddress,
      pincode,
      state,
      district,
      country,
    } = req.body;

    // Validation
    if (
      !registrationNo ||
      !localAddress ||
      !permanentAddress ||
      !pincode ||
      !state ||
      !district ||
      !country
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if entry already exists for this student
    const existing = await AddressDetails.findOne({ where: { registrationNo } });
    if (existing) {
      return res.status(409).json({
        error: `Address details already exist for registrationNo ${registrationNo}`,
      });
    }

    // Create new AddressDetails
    const newAddress = await AddressDetails.create({
      registrationNo,
      localAddress,
      permanentAddress,
      pincode,
      state,
      district,
      country,
    });

    return res.status(201).json({
      message: "Address details created successfully",
      data: newAddress,
    });
  } catch (error: any) {
    console.error("Error creating AddressDetails:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getAddressDetails = async (req: Request, res: Response) => {
  try {
    const { registrationNo } = req.params;
    const addressDetails = await AddressDetails.findOne({
      attributes: ["localAddress", "permanentAddress", "pincode", "state", "district", "country"],
      where: { registrationNo, isDeleted: false }
    });

    if (!addressDetails) {
      return res.status(404).json({ error: "Address details not found" });
    }

    return res.status(200).json(addressDetails);
  } catch (error: any) {
    console.error("Error fetching AddressDetails:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const updateAddressDetails = async (req: Request, res: Response) => {
  try {
    const { registrationNo } = req.params;
    const updateData = req.body;

    // Validate
    if (!registrationNo) {
      return res.status(400).json({ error: "registrationNo is required" });
    }

    // Find record
    const addressDetails = await AddressDetails.findOne({
      where: { registrationNo },
    });

    if (!addressDetails) {
      return res
        .status(404)
        .json({ error: "Address details not found for this student" });
    }

    // Update record
    await addressDetails.update(updateData);

    return res.status(200).json({
      message: "Address details updated successfully",
      data: addressDetails,
    });
  } catch (error: any) {
    console.error("Error updating address details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};