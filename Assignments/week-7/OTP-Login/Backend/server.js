const express = require ('express');
const otpGenerator = require('otp-generator');
const app = express();
const cors = require('cors');
const PORT = 5000;
app.use(express.json());
app.use(cors());

const otpStorage = {};

app.post('/api/sendotp' , (req,res) => {
    const {phoneNumber} = req.body;
    const otp = otpGenerator.generate(4, {digits: true,lowerCaseAlphabets: false, specialChars:false,upperCaseAlphabets:false})
    otpStorage[phoneNumber] = otp;
    console.log(`OTP for ${phoneNumber}: ${otp}`);

    res.json({
        otp:otp,
        success: true,
    })
})


app.post('/api/verifyotp', (req,res) =>{
    const {phoneNumber,otp} = req.body;
    if(otpStorage[phoneNumber] === otp){
        delete otpStorage[phoneNumber];
        res.json({
            success:true
        })
    } else{
        res.json({
            success:false
        })
    }
})



app.listen(PORT,() =>{ console.log(`Server is running on port ${PORT}`)})