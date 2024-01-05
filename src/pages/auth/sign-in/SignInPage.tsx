import { FormEvent, useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import AuthWrapper from "../AuthWrapper";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import * as Yup from 'yup';
import { useFormik } from "formik";
import CustomButton from "../../../components/custom-button/CustomButton";
import { CustomButtonType } from "../../../components/custom-button/StyledCustomButton";
import CustomInput from "../../../components/custom-input/CustomInput";

const SignInPage = () => {
  const [error, setError] = useState(false);

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: Yup.string().required("Please enter password")
    }),
    onSubmit: async values => {
      httpRequestService
      .signIn(values)
      .then(() => {
        navigate("/")
      })
      .catch(() => setError(true));;
    },
  });

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <div className={"input-container"}>
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
            {!formik.errors.email && !formik.errors.password && (
                <p className={"error-message"}>{error && t("error.login")}</p>
            )}
            
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <CustomButton
              type="submit"
              text={t("buttons.login")}
              customButtonType={CustomButtonType.FULFILLED}
              size={"LARGE"}
              onClick={(e: FormEvent) => formik.handleSubmit()}
            />
            <CustomButton
              type="button"
              text={t("buttons.register")}
              customButtonType={CustomButtonType.WHITE}
              size={"LARGE"}
              onClick={() => navigate("/sign-up")}
            />
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignInPage;
