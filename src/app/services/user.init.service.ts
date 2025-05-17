// import { v4 as uuidv4 } from "uuid";
import secureLocalStorage from "react-secure-storage";

const USER_ID_KEY = "USER_ID";

export function userInitService() {
	const existing = secureLocalStorage.getItem(USER_ID_KEY);

	let userId: string;
	if (typeof existing === "string") {
		userId = existing;
	} else {
		userId = `anon_test_user_001`;
		secureLocalStorage.setItem(USER_ID_KEY, userId);
	}
	return userId;
}
