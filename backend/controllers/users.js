import { decryptEmail } from "../utils/cryptDecryptEmail.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

export const getUserById = async (req, res) => {
    try {
        const { _id } = req.user;

        const user = await User.findById(_id);

        const emailDecrypted = decryptEmail(
            user.email,
            process.env.key,
            process.env.iv
        );

        user.email = emailDecrypted;
        return res.status(200).json({
            message: "Information User",
            data: user,
            check: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            check: false,
        });
    }
};

export const modifyUser = async (req, res) => {
    const { _id } = req.user;

    const data = req.body;
    if (data.password) {
        const salt = bcrypt.genSaltSync(10);
        const newPw = await bcrypt.hash(data.password, salt);

        data.password = newPw;
    }
    try {
        const userUpdate = await User.findByIdAndUpdate(_id, data, {
            new: true,
        });

        if (!userUpdate) {
            return res.status(404).json({
                message: "User not found",
                data: [],
                check: false,
            });
        }

        return res.status(200).json({
            message: "User update successfully",
            data: userUpdate,
            check: false,
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({
                message: "Email already registered",
                data: [],
                check: false,
            });
        } else {
            return res.status(500).json({
                message: error.message,
                data: [],
                check: false,
            });
        }
    }
};

export const deleteUser = async (req, res)=>{
    const {_id} = req.user

    try {
        const userDelete = await User.findByIdAndDelete(_id)

        if(!userDelete){
            return res.status(404).json({
                message: "User not found",
                data: [],
                check: false
            })
        }

        return res.status(200).json({
            message: "User successfully removed",
            data: userDelete,
            check: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            data: [],
            check: false
        })
    }
}