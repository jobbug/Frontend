import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleLoginButton = () => {
    const clientId = '607941716422-goaocftar6hi9o8e0pv0roh8maqm34kk.apps.googleusercontent.com';  // clientId 문자열로 설정

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>  {/* clientId 문자열로 전달 */}
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log('Login Success:', res);
                    }}
                    onError={(err) => {
                        console.log('Login Failed:', err);
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton;
