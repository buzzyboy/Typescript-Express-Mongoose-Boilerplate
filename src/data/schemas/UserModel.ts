const jwt = require('jsonwebtoken');
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

interface IUser extends mongoose.Document {
    username: string;
    password: string;
    email: string;
    createAccessToken(): string;
    comparePassword(password: string): Promise<boolean>;
}

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.password;
        }
    },
});

UserSchema.pre('save', function(next) {
    // @ts-ignore
    const user: IUser = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.createAccessToken = function (this: IUser) {
    const token = jwt.sign(this.toJSON(), process.env.JWT_SECRET);
    return token;
};

UserSchema.methods.comparePassword = function(password): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) {
                return reject(err);
            }
            return resolve(isMatch);
        });
    });
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
