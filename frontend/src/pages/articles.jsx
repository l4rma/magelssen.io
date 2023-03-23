import { Link } from "react-router-dom";
export default function Articles() {
    return(
        <>
            <h1>Articles</h1>
            <ul className="article-list">
                <li>
                    <Link to="/Articles/this-website">
                        Creating this website: Dev log
                    </Link>
                </li>
            </ul>
        </>
    );
}
