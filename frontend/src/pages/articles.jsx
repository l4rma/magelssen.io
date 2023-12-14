import { Link } from "react-router-dom";
export default function Articles() {
    return(
        <>
            <h1>Articles</h1>
            <hr />
            <br />
            <ul className="article-list">
                <li>
                    <Link to="/Articles/searching">
                        Find and Grep - How to search in a Unix system
                    </Link>
                </li>
                <li>
                    <Link to="/Articles/tar">
                        Tar - Extracting .tar.gz files
                    </Link>
                </li>
            </ul>
        </>
    );
}
