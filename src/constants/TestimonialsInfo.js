import {collection, getDocs} from "firebase/firestore"
import {db} from "../../firebaseConfig.js"

// const TestimonialsInfo = [
//     {
//         text: "Работа с Web Express — это как заказать сайт у волшебника! Все было сделано молниеносно, при этом качество просто на высоте. Рекомендую всем, кто ценит свое время и хочет получить крутой результат!",
//         name: "Анна Соколова",
//         job: "Владелица студии йоги"
//     },
//     {
//         text: "Мы обратились в Web Express за корпоративным сайтом, и, честно говоря, ожидания превзошли реальность! Сайт был готов в три раза быстрее, чем обещали другие компании. Искусственный интеллект и их команда — просто фантастика!",
//         name: "Максим Линдберг",
//         job: "Координатор экологических инициатив"
//     },
//     {
//         text: "Меня поразило внимание к деталям. В Web Express не только быстро создали сайт, но и учли все мои пожелания. Я даже не ожидал, что это возможно в такие сжатые сроки.",
//         name: "Ольга Смирнова",
//         job: "Владелица бутика авторских украшений"
//     },
//     {
//         text: "Благодаря Web Express наш бизнес теперь выглядит профессионально и современно в интернете. А главное, это было так быстро, что я даже не успел заметить, как все закончилось!",
//         name: "Алексей Воронов",
//         job: "Совладелец кофейни"
//     }
// ]


export const getTestimonials = async () => {
    try {
        const testimonials = []
        const reviewsRef = collection(db, "reviews")
        const snapshot = await getDocs(reviewsRef)
        snapshot.docs.forEach((doc) => {
            testimonials.push({ ...doc.data(), id: doc.id })
        })
        return testimonials
    } catch (err) {
        console.error(err.message)
        return []
    }
}