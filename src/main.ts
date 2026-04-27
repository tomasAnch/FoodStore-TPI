import { getUSer } from "./utils/localStorage";
import { navigate } from "./utils/navigate";
import type { IUser } from './types/IUser';

const initPage = () => {

    const user = getUSer();

    if (!user) {
        navigate('/src/pages/auth/login/login.html')
    } else {
        const parseUser: IUser = JSON.parse(user);
        if (parseUser.role === 'admin') {
            navigate('/src/pages/admin/home/home.html')
        } else {
            navigate('/src/pages/client/home/home.html')
        }
    }
}

initPage();