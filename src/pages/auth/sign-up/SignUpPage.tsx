import type { FormEvent } from "react";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../../../components/custom-button/CustomButton";
import { CustomButtonType } from "../../../components/custom-button/StyledCustomButton";


const SignUpPage = () => {
  const [error, setError] = useState(false);

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please enter name"),
      username: Yup.string().required("Please enter username"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .test('passwords-match', 'Passwords must match', function(value){
          return this.parent.password === value;
        })
    }),
    onSubmit: async values => {
      const { confirmPassword, ...requestData } = values;
      httpRequestService
        .signUp(requestData)
        .then(() => {
          navigate("/")
        })
        .catch(() => setError(true));
    },
  });

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <div className={"input-container"}>
            <LabeledInput
              required
              placeholder={"Enter name..."}
              title={t("input-params.name")}
              error={error}
              onChange={formik.handleChange("name")}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
                <p className={"error-message"}>{formik.errors.name}</p>
            )}
            <LabeledInput
              required
              placeholder={"Enter username..."}
              title={t("input-params.username")}
              error={error}
              onChange={formik.handleChange("username")}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
                <p className={"error-message"}>{formik.errors.username}</p>
            )}
            <LabeledInput
              required
              placeholder={"Enter email..."}
              title={t("input-params.email")}
              error={error}
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
                <p className={"error-message"}>{formik.errors.email}</p>
            )}
            <LabeledInput
              type="password"
              required
              placeholder={"Enter password..."}
              title={t("input-params.password")}
              error={error}
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
                <p className={"error-message"}>{formik.errors.password}</p>
            )}
            <LabeledInput
              type="password"
              required
              placeholder={"Confirm password..."}
              title={t("input-params.confirm-password")}
              error={error}
              onChange={formik.handleChange("confirmPassword")}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className={"error-message"}>{formik.errors.confirmPassword}</p>
            )}
            {
              !formik.errors.name &&
              !formik.errors.username &&
              !formik.errors.email &&
              !formik.errors.password &&
              !formik.errors.confirmPassword && (
                <p className={"error-message"}>{error && t("error.signup")}</p>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <CustomButton
              type={"submit"}
              text={t("buttons.register")}
              customButtonType={CustomButtonType.FULFILLED}
              size={"LARGE"}
              onClick={(e: FormEvent) => formik.handleSubmit()}
            />
            <CustomButton
              type={"button"}
              text={t("buttons.login")}
              customButtonType={CustomButtonType.WHITE}
              size={"LARGE"}
              onClick={() => navigate("/sign-in")}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
