import {collection, getDocs, query, orderBy} from "firebase/firestore"
import {db} from "../../firebaseConfig.js"


export const getProjects = async () => {
    try {
        const projects = []
        let projectsRef = collection(db, "projects")
        projectsRef = query(projectsRef, orderBy("order", "asc"))
        const snapshot = await getDocs(projectsRef)
        snapshot.docs.forEach((doc) => {
            projects.push({ ...doc.data(), id: doc.id })
        })
        return projects
    } catch (err) {
        console.error(err.message)
        return []
    }
}