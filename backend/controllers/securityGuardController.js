const SecurityGuard = require('../models/SecurityGuard');
const path = require('path');
const fs = require('fs');

// Create a new security guard
const upload = require('../middlewares/fileUpload'); // Assuming you saved the multer configuration in this path

// Create a new security guard with Aadhaar card upload
exports.createSecurityGuard = async (req, res) => {

    upload.single('aadhaarCard')(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({ message: 'File upload error: ' + err.message });
          }

      try {
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { fullName, phoneNumber, selectShift, date, time, gender } = req.body;
  
        if (!fullName || !phoneNumber || !selectShift || !date || !time || !gender) {
          return res.status(400).json({ message: 'All fields are required' });
        }
  
           const aadhaarCardPath = req.file ? path.join(__dirname, '../', req.file.path) : null;
    console.log('Aadhaar Card Path:', aadhaarCardPath);
  
        const newSecurityGuard = new SecurityGuard({
          fullName,
          phoneNumber,
          selectShift,
          date,
          time,
          gender,
          aadhaarCard: aadhaarCardPath,
        });
  
        const savedGuard = await newSecurityGuard.save();
        res.status(201).json({ message: 'Security Guard created successfully', data: savedGuard });
      } catch (error) {
        res.status(500).json({ message: 'Error creating security guard', error: error.message });
      }
    });
  };
  


// Get all security guards
exports.getAllSecurityGuards = async (req, res) => {
    try {
        const securityGuards = await SecurityGuard.find();
        res.status(200).json(securityGuards);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving security guards', error });
    }
};

// Update a security guard
// exports.updateSecurityGuard = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { fullName, phoneNumber, selectShift, date, time, gender } = req.body;
//         let aadhaarCard = req.file ? req.file.path : undefined;

//         const securityGuard = await SecurityGuard.findByIdAndUpdate(id, {
//             fullName,
//             phoneNumber,
//             selectShift,
//             date,
//             time,
//             gender,
//             ...(aadhaarCard && { aadhaarCard })
//         }, { new: true });

//         if (!securityGuard) {
//             return res.status(404).json({ message: 'Security Guard not found' });
//         }

//         res.status(200).json({ message: 'Security Guard updated successfully', securityGuard });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating security guard', error: error.message });
//         console.error('Error details:', error);
//     }
// };

exports.updateSecurityGuard = async (req, res) => {
    upload.single('aadhaarCard')(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({ message: 'File upload error: ' + err.message });
          }


      try {
     
        const { id } = req.params;
        const { fullName, phoneNumber, selectShift, date, time, gender } = req.body;
  
        const securityGuard = await SecurityGuard.findById(id);
        if (!securityGuard) {
          return res.status(404).json({ message: 'Security Guard not found' });
        }
  
        if (req.file) {
          const newAadhaarCard = req.file.path;
  
          // Delete the old file
          if (securityGuard.aadhaarCard && fs.existsSync(securityGuard.aadhaarCard)) {
            fs.unlinkSync(securityGuard.aadhaarCard);
          }
  
          securityGuard.aadhaarCard = newAadhaarCard;

          console.log('Uploaded file:', req.file);
        }
  
        securityGuard.fullName = fullName || securityGuard.fullName;
        securityGuard.phoneNumber = phoneNumber || securityGuard.phoneNumber;
        securityGuard.selectShift = selectShift || securityGuard.selectShift;
        securityGuard.date = date || securityGuard.date;
        securityGuard.time = time || securityGuard.time;
        securityGuard.gender = gender || securityGuard.gender;
  
        const updatedGuard = await securityGuard.save();
        res.status(200).json({ message: 'Security Guard updated successfully', data: updatedGuard });
      } catch (error) {
        res.status(500).json({ message: 'Error updating security guard', error: error.message });
      }
    });
  };
  



// Delete a security guard
exports.deleteSecurityGuard = async (req, res) => {
    try {
        const { id } = req.params;
        const securityGuard = await SecurityGuard.findByIdAndDelete(id);

        if (!securityGuard) {
            return res.status(404).json({ message: 'Security Guard not found' });
        }

        if (securityGuard.aadhaarCard) {
            try {
                // Check if the file exists before trying to delete
                if (fs.existsSync(securityGuard.aadhaarCard)) {
                    fs.unlinkSync(securityGuard.aadhaarCard); // Delete the file
                    console.log(`File ${securityGuard.aadhaarCard} deleted successfully`);
                } else {
                    console.error(`File ${securityGuard.aadhaarCard} does not exist`);
                }
            } catch (fileError) {
                console.error(`Error deleting file ${securityGuard.aadhaarCard}:`, fileError);
                return res.status(500).json({ message: 'Error deleting file', error: fileError.message });
            }
        }

        res.status(200).json({ message: 'Security Guard deleted successfully' });
    } catch (error) {
        console.error('Error deleting security guard:', error);
        return res.status(500).json({ message: 'Error deleting security guard', error: error.message });
    }
};


// Get a single security guard
exports.getSecurityGuardById = async (req, res) => {
    try {
        const { id } = req.params;
        const securityGuard = await SecurityGuard.findById(id);
        res.status(200).json(securityGuard);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving security guard', error });
    }
};
