import css from './Home.module.css'

const NotFoundPage = () => {
    return (
        <div>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    )
}

export default NotFoundPage