import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    handle: {
      type: String,
      unique:true,
      required:true
    },
    password: {
      type: String,
      required: true,
      
    },
    avatar: {
      type: String,
      default: "https://images2.imgbox.com/a0/6f/vSwvfHrU_o.png",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

export const User = model("User", userSchema);
