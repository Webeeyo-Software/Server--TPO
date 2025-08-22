import { Request, Response } from "express";
import db from "../../models"; // adjust path if needed

const StudentProfiles = db.StudentProfiles;

// ✅ Create new student profile

const Categories = db.Categories;
const Religions = db.Religions;
const Nationalities = db.Nationalities;
const BloodGroups = db.BloodGroups;
const Departments = db.Departments;



export const createPersonalDetails = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      fullName,
      email,
      dob,
      deptId,
      registrationNumber,
      aadharNumber,
      contactNumber,
      department,
      bloodGroup,
      nationality,
      religion,
      category,
      year,
      admissionDate,
      guardianName,
      guardianContact,
      gender,
    } = req.body;

    // ✅ Basic validations
    if (!registrationNumber) return res.status(400).json({ error: "Registration Number is required" });
    if (!userId) return res.status(400).json({ error: "User ID is required" });
    if (!gender) return res.status(400).json({ error: "Gender is required" });
    if (aadharNumber && aadharNumber.length !== 12) return res.status(400).json({ error: "Aadhaar must be 12 digits" });
    if (contactNumber && contactNumber.length !== 10) return res.status(400).json({ error: "Mobile must be 10 digits" });

    // ✅ Split name
    const nameParts = fullName ? fullName.trim().split(" ") : [];
    const fname = nameParts[0] || "";
    const mname = nameParts.length === 3 ? nameParts[1] : "";
    const lname = nameParts.length === 3 ? nameParts[2] : nameParts[1] || "";

    // ✅ Lookups for foreign keys
    const dept = department ? await Departments.findOne({ where: { deptName: department } }) : null;
    const bg = bloodGroup ? await BloodGroups.findOne({ where: { bloodGroup } }) : null;
    const nation = nationality ? await Nationalities.findOne({ where: { nationalityName: nationality } }) : null;
    const rel = religion ? await Religions.findOne({ where: { religionName: religion } }) : null;
    const cat = category ? await Categories.findOne({ where: { categoryName: category } }) : null;

    if (department && !dept) return res.status(400).json({ error: `Department "${department}" not found` });
    if (bloodGroup && !bg) return res.status(400).json({ error: `Blood Group "${bloodGroup}" not found` });
    if (nationality && !nation) return res.status(400).json({ error: `Nationality "${nationality}" not found` });
    if (religion && !rel) return res.status(400).json({ error: `Religion "${religion}" not found` });
    if (category && !cat) return res.status(400).json({ error: `Category "${category}" not found` });

    // ✅ Save with only foreign keys
    const details = await StudentProfiles.create({
      userId,
      registrationNo: registrationNumber,
      fname,
      mname,
      lname,
      dob,
      gender,
      email,
      mobile: contactNumber,
      aadharNumber,
      deptId: dept?.id,
      bgId: bg?.id,
      nationalityId: nation?.id,
      religionId: rel?.id,
      categoryId: cat?.id,
      guardianName,
      guardianContact,
      year,
      admissionDate,
    });

    res.status(201).json({
      message: "Personal details saved successfully",
      data: details,
    });
  } catch (error) {
    console.error("Error creating personal details:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};



// ✅ Get student profile by ID (registrationNo)
export const getStudentProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const profile = await StudentProfiles.findOne(
      {
        attributes: ["registrationNo","fname", "mname", "lname",  "email","dob","gender","mobile","aadharNumber","guardianName","guardianContact","admissionDate","year"],
        where: { registrationNo: id, isDeleted: false },
        include: [
        { model: Departments, as: "departments", attributes: ["deptName"] },
        { model: BloodGroups, as: "bloodGroups", attributes: ["bloodGroup"] },
        { model: Nationalities, as: "nationalities", attributes: ["nationalityName"] },
        { model: Religions, as: "religions", attributes: ["religionName"] },
        { model: Categories, as: "categories", attributes: ["categoryName"] },
      ],
      
      }

    );

    if (!profile) {
      return res.status(404).json({ error: "Student profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error: any) {
    console.error("Error fetching student profile:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};


// ✅ Update student profile by registrationNo
export const updateStudentProfile = async (req: Request, res: Response) => {
  try {
    const { registrationNo } = req.params;
    const updates = req.body; // whatever fields are passed in body

    // Find student
    const student = await StudentProfiles.findByPk(registrationNo);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Update
    await student.update(updates);

    res.status(200).json({
      message: "Student profile updated successfully",
      data: student,
    });
  } catch (error: any) {
    console.error("Error updating student profile:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

