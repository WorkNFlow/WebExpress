import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

export const getBlogById = async (id) => {
    try {
        const blogRef = doc(db, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
            return blogSnap.data();
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (err) {
        console.error("Error getting document:", err);
        return null;
    }
};

