import { User } from "../models/user.js";
import { cryptEmail } from "../utils/cryptDecryptEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const emailCrypted = cryptEmail(email, process.env.key, process.env.iv);

    const salt = bcrypt.genSaltSync(10);
    const pwHashed = await bcrypt.hash(password, salt);

    const newUser = new User({
        username: username,
        email: emailCrypted,
        password: pwHashed,
    });

    try {
        await newUser.save();
        res.status(201).json({
            message: "Registration done",
            data: newUser,
            check: true,
        });
    } catch (error) {
        let duplicated = ""
        if (error.code === 11000) {
            if(error.message.includes("email")){
                duplicated  = "Email"
            }else if(error.message.includes("username")){
                duplicated  = "Username"
            }
            res.status(409).json({
                message: `${duplicated} already registered`,
                data: [],
                check: false,
            });
        } else {
            res.status(500).json({
                message: error.message,
                data: [],
                check: false,
            });
        }
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userFind = await User.findOne({ username });

        // L'utente esiste
        if (userFind && (await bcrypt.compare(password, userFind.password))) {
            const token = jwt.sign(
                {
                    _id: userFind._id,
                },
                process.env.JWT_SECRET,
                {
                    algorithm: "HS256",
                    expiresIn: "7d",
                }
            );

            // const expiresInMilliseconds = 7 * 24 * 60 * 60 * 1000;
            return res
                .status(200)
                .json({
                    message: "Login is done",
                    data: token,
                    check: true,
                });
        } else {
            // L'utente non esiste
            return res.status(404).json({
                message: "Incorrect email or password",
                data: [],
                status: false,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: [],
            check: false
        })
    }
};