import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'

export const test = ( req, res) => {
    res.json({ message: 'Api working'});
};

export const updateUser = async ( req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'your are not allowed to update this user'));
    }
    if (req.body.password){
        if(req.body.password.length < 6 ) {
            return next(errorHandler(400 , 'password should be more than 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if(req.body.username) {
        if(req.body.username.length < 7 || req.body.username.length > 15 ) {
            return next(errorHandler(400 , 'username must be between 7 to 15 characters'));
        }
        if(req.body.username.includes(' ')) {
            return next (errorHandler(400 , ' username should not have spaces'));
        }
        if(req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next (errorHandler(400 , ' username should only have letters and numbers'));
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilepicture: req.body.password,
                    password: req.body.password,
                },
            },
            { new: true}
        );
        const { password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
         } catch (error) {
            next(error);
        }

    }


};