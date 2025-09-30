import { useParams } from "react-router-dom";
const SetNewPasswordForm = () => {
    const { userId } = useParams();
    const { forgotPwToken } = useParams();

    return (
        <div>
            SetNewPasswordForm
            {userId}{" "}{/* TODO: mock forgot pw request to backend console */}
            {forgotPwToken}
        </div>
    )
}

export default SetNewPasswordForm;