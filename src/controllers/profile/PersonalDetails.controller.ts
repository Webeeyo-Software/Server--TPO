// import { Request, Response } from "express";
// import db from "../../models";

// const StudentProfiles = db.StudentProfiles;
// const Categories = db.Categories;
// const Religions = db.Religions;
// const Nationalities = db.Nationalities;
// const BloodGroups = db.BloodGroups;
// const Departments = db.Departments;

// export const createPersonalDetails = async (req: Request, res: Response) => {
//   try {
//     const {
//       userId,              // ✅ Required
//       fullName,
//       email,
//       dob,
//       registrationNumber,
//       aadhaarNumber,
//       contactNumber,
//       department,
//       bloodGroup,
//       nationality,
//       religion,
//       category,
//       yearOfPassing,
//       year,
//       admissionDate,
//       guardianName,
//       guardianContact,
//       gender,              // ✅ Required
//       address              // ✅ Required
//     } = req.body;

//     // ✅ Validation
//     if (!registrationNumber) {
//       return res.status(400).json({ error: "Registration Number is required" });
//     }
//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required" });
//     }
//     if (!gender) {
//       return res.status(400).json({ error: "Gender is required" });
//     }
//     if (!address) {
//       return res.status(400).json({ error: "Address is required" });
//     }
//     if (aadhaarNumber && aadhaarNumber.length !== 12) {
//       return res.status(400).json({ error: "Aadhaar must be 12 digits" });
//     }
//     if (contactNumber && contactNumber.length !== 10) {
//       return res.status(400).json({ error: "Mobile must be 10 digits" });
//     }

//     // ✅ Split full name into fname, mname, lname
//     const nameParts = fullName ? fullName.split(" ") : [];
//     const fname = nameParts[0] || "";
//     const mname = nameParts.length === 3 ? nameParts[1] : "";
//     const lname = nameParts.length === 3 ? nameParts[2] : nameParts[1] || "";

//     // ✅ Fetch foreign keys
//     const dept = department
//       ? await Departments.findOne({ where: { deptName: department } })
//       : null;

//     const bg = bloodGroup
//       ? await BloodGroups.findOne({ where: { bloodGroup: bloodGroup } })
//       : null;

//     const nation = nationality
//       ? await Nationalities.findOne({ where: { nationalityName: nationality } })
//       : null;

//     const rel = religion
//       ? await Religions.findOne({ where: { religionName: religion } })
//       : null;

//     const cat = category
//       ? await Categories.findOne({ where: { categoryName: category } })
//       : null;

//     // ✅ Create record in StudentProfiles
//     const details = await StudentProfiles.create({
//       userId,  // ✅ Required
//       registration_no: registrationNumber,
//       fname,
//       mname,
//       lname,
//       dob,
//       gender, // ✅ Required
//       address, // ✅ Required
//       mobile: contactNumber,
//       aadharNumber: aadhaarNumber, // ✅ Required
//       deptId: dept?.dept_id,       // ✅ Required
//       bgId: bg?.bg_id,
//       nationalityId: nation?.nationality_id,
//       religionId: rel?.religion_id,
//       categoryId: cat?.category_id,
//       guardianName,
//       guardianContact,
//       year,
//       admissionDate,
//     });

//     res.status(201).json({
//       message: "Personal details saved successfully",
//       data: details,
//     });
//   } catch (error) {
//     console.error("Error creating personal details:", error);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };
import { Request, Response } from "express";
import db from "../../models";

const StudentProfiles = db.StudentProfiles;
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
      registrationNumber,
      aadhaarNumber,
      contactNumber,
      department,
      bloodGroup,
      nationality,
      religion,
      category,
      yearOfPassing,
      year,
      admissionDate,
      guardianName,
      guardianContact,
      gender,
      address
    } = req.body;

    
    if (!registrationNumber) return res.status(400).json({ error: "Registration Number is required" });
    if (!userId) return res.status(400).json({ error: "User ID is required" });
    if (!gender) return res.status(400).json({ error: "Gender is required" });
    if (!address) return res.status(400).json({ error: "Address is required" });
    if (aadhaarNumber && aadhaarNumber.length !== 12) return res.status(400).json({ error: "Aadhaar must be 12 digits" });
    if (contactNumber && contactNumber.length !== 10) return res.status(400).json({ error: "Mobile must be 10 digits" });

    
    const nameParts = fullName ? fullName.trim().split(" ") : [];
    const fname = nameParts[0] || "";
    const mname = nameParts.length === 3 ? nameParts[1] : "";
    const lname = nameParts.length === 3 ? nameParts[2] : nameParts[1] || "";

    
    const dept = department ? await Departments.findOne({ where: { deptName: department } }) : null;
    const bg = bloodGroup ? await BloodGroups.findOne({ where: { bloodGroup: bloodGroup } }) : null;
    const nation = nationality ? await Nationalities.findOne({ where: { nationalityName: nationality } }) : null;
    const rel = religion ? await Religions.findOne({ where: { religionName: religion } }) : null;
    const cat = category ? await Categories.findOne({ where: { categoryName: category } }) : null;

    
    if (!dept) return res.status(400).json({ error: `Department "${department}" not found` });
    if (bloodGroup && !bg) return res.status(400).json({ error: `Blood Group "${bloodGroup}" not found` });
    if (nationality && !nation) return res.status(400).json({ error: `Nationality "${nationality}" not found` });
    if (religion && !rel) return res.status(400).json({ error: `Religion "${religion}" not found` });
    if (category && !cat) return res.status(400).json({ error: `Category "${category}" not found` });

    
    const details = await StudentProfiles.create({
      userId,
      registration_no: registrationNumber,
      fname,
      mname,
      lname,
      dob,
      gender,
      address,
      mobile: contactNumber,
      aadhaarNumber,
      deptId: dept.deptId,
      bgId: bg?.bgId || null,
      nationalityId: nation?.nationalityId || null,
      religionId: rel?.religionId || null,
      categoryId: cat?.categoryId || null,
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
