import { Outlet,} from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <>
            <header>
                <h2>ToDo</h2>
                <img className='cover-img' src='../images/bg-desktop.jpg' />
            </header>

            <Outlet />
        </>

    )
}