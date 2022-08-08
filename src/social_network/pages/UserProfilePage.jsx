import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from '../../helpers/getUserById';
import { NavBar } from '../components';


export const UserProfilePage = () => {
    const [UserData, setUserData] = useState(false);
    const { uid } = useParams();

    const user = useMemo(() => getUserById(uid), [uid]);

    user.then((value) => setUserData(value[0]));

    return (
        <>  
            <NavBar />
            {/*UserData.email*/}
            <h2 className="position-fixed top-50 start-50 text-center">{UserData.email} <br /> {UserData.username} <br /> {uid}</h2>
        </>
    )
}
