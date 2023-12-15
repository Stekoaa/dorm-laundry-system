import axios from "axios";
import { SignupRequestDto } from "./SignupRequestDto";

const BASE_URL = 'http://localhost:8080/laundry';

export async function submitSignup(params: SignupRequestDto): Promise<any> {
    const result = await axios.post<SignupRequestDto>(BASE_URL + '/v1/auth/signup',
        params,
        {
            headers: { 'Content-Type': 'application/json' }
        })
    return result;
}