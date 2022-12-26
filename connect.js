import mongoose from "mongoose";

const URI =
  "mongodb+srv://ignited:zaq12345@tamimscluster.b7ddp.mongodb.net/blogify?retryWrites=true&w=majority";
export async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(URI);
    } catch {
      throw new Error("Error MongoDB");
    }
  } else {
    return;
  }
}
