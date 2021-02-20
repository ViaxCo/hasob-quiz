import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react";
import {
  Formik,
  Form as FormikForm,
  Field,
  FormikHelpers,
  FieldProps
} from "formik";
import { FaFacebook } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { capitalizeFirstLetter, history } from "../utils";
import { useAppDispatch } from "../redux/hooks";
import { signup } from "../redux/features/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// Give the components chakra props
export const FbIcon = chakra(FaFacebook);

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Give the components chakra props
const Form = chakra(FormikForm);
const ExitIcon = chakra(BiExit);
const VisibleEye = chakra(AiFillEye);
const InvisibleEye = chakra(AiFillEyeInvisible);

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required")
  });

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>
  ) => {
    const firstName = capitalizeFirstLetter(values.firstName);
    const lastName = capitalizeFirstLetter(values.lastName);
    const newUser = {
      firstName,
      lastName,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword
    };
    try {
      const res = await dispatch(signup(newUser));
      unwrapResult(res);
      toast({
        title: "Successfully registered",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top"
      });
    } catch (error) {
      console.log(error);
      if (error === "The email has already been taken.") {
        toast({
          title: error,
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top"
        });
        actions.setSubmitting(false);
      } else {
        toast({
          title: "An error occurred",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top"
        });
        actions.setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Center minH="100vh" minW="100vw">
          <Form
            action="/"
            w="100%"
            maxW="480px"
            px={6}
            pt={6}
            pb={12}
            boxShadow="lg"
            border="1px solid"
            borderColor="blackAlpha.100"
          >
            <VStack spacing={6}>
              <Link
                as={RouterLink}
                to="/"
                _hover={{ textDecoration: "none", color: "appPurple.600" }}
                fontWeight="bold"
                fontSize="lg"
                alignSelf="flex-start"
              >
                <Button>Quiz App</Button>
              </Link>
              <Heading
                fontSize="2xl"
                textTransform="uppercase"
                color="appPurple.500"
              >
                Register
              </Heading>
              <Stack
                spacing={6}
                justify="space-between"
                w="100%"
                direction={["column", "row"]}
              >
                <Field name="firstName">
                  {({ field, form }: FieldProps<any, Values>) => (
                    <FormControl
                      w={["100%", "47%"]}
                      isInvalid={
                        form.errors.firstName
                          ? form.touched.firstName
                          : undefined
                      }
                    >
                      {/* field: { name, value, onChange, onBlur } */}
                      <Input
                        {...field}
                        id="firstName"
                        type="firstName"
                        placeholder="First Name"
                        _placeholder={{
                          color: "gray.600"
                        }}
                        bg="blackAlpha.200"
                        py={6}
                        autoComplete="on"
                      />
                      <FormErrorMessage>
                        {form.errors.firstName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="lastName">
                  {({ field, form }: FieldProps<any, Values>) => (
                    <FormControl
                      w={["100%", "47%"]}
                      isInvalid={
                        form.errors.lastName ? form.touched.lastName : undefined
                      }
                    >
                      {/* field: { name, value, onChange, onBlur } */}
                      <Input
                        {...field}
                        id="lastName"
                        type="lastName"
                        placeholder="Last Name"
                        _placeholder={{
                          color: "gray.600"
                        }}
                        bg="blackAlpha.200"
                        py={6}
                        autoComplete="on"
                      />
                      <FormErrorMessage>
                        {form.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
              <Field name="email">
                {({ field, form }: FieldProps<any, Values>) => (
                  <FormControl
                    w="100%"
                    isInvalid={
                      form.errors.email ? form.touched.email : undefined
                    }
                  >
                    {/* field: { name, value, onChange, onBlur } */}
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      _placeholder={{
                        color: "gray.600"
                      }}
                      bg="blackAlpha.200"
                      py={6}
                      autoComplete="on"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: FieldProps<any, Values>) => (
                  <FormControl
                    w="100%"
                    isInvalid={
                      form.errors.password ? form.touched.password : undefined
                    }
                  >
                    <InputGroup>
                      {/* field: { name, value, onChange, onBlur } */}
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        _placeholder={{
                          color: "gray.600"
                        }}
                        bg="blackAlpha.200"
                        py={6}
                        autoComplete="on"
                      />
                      <InputRightElement h="100%" mr={1}>
                        <IconButton
                          aria-label="Show or Hide password"
                          borderRadius="full"
                          colorScheme="appPurple"
                          variant="link"
                          size="sm"
                          icon={
                            showPassword ? (
                              <VisibleEye size={22} />
                            ) : (
                              <InvisibleEye size={22} />
                            )
                          }
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="confirmPassword">
                {({ field, form }: FieldProps<any, Values>) => (
                  <FormControl
                    w="100%"
                    isInvalid={
                      form.errors.confirmPassword
                        ? form.touched.confirmPassword
                        : undefined
                    }
                  >
                    <InputGroup>
                      {/* field: { name, value, onChange, onBlur } */}
                      <Input
                        {...field}
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        _placeholder={{
                          color: "gray.600"
                        }}
                        bg="blackAlpha.200"
                        py={6}
                        autoComplete="on"
                      />
                      <InputRightElement h="100%" mr={1}>
                        <IconButton
                          aria-label="Show or Hide password"
                          borderRadius="full"
                          colorScheme="appPurple"
                          variant="link"
                          size="sm"
                          icon={
                            showConfirmPassword ? (
                              <VisibleEye size={22} />
                            ) : (
                              <InvisibleEye size={22} />
                            )
                          }
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                type="submit"
                isLoading={props.isSubmitting}
                textTransform="uppercase"
                w="100%"
                colorScheme="appPurple"
                py={[6, 7]}
                fontWeight="700"
              >
                <ExitIcon size={26} flex={1} />
                <Text flex={6} px={1}>
                  Create Account
                </Text>
                <Box visibility="hidden" flex={1} />
              </Button>
              <Link w="100%" _hover={{ textDecoration: "none" }}>
                <Button
                  textTransform="uppercase"
                  colorScheme="facebook"
                  w="100%"
                  py={[6, 7]}
                  fontWeight="700"
                >
                  <FbIcon size={26} flex={1} />
                  <Text flex={8} pl={2}>
                    Register with Facebook
                  </Text>

                  <Box
                    visibility="hidden"
                    flex={1}
                    d={{ base: "none", mobileM: "block" }}
                  />
                </Button>
              </Link>
              <Text alignSelf="flex-start">
                Already have an account?{" "}
                <Link
                  as={RouterLink}
                  to="/login"
                  _hover={{ textDecoration: "none", color: "appPurple.600" }}
                  _active={{ color: "appPurple.700" }}
                  color="appPurple.500"
                  fontWeight="bold"
                  ml={2}
                >
                  Sign In
                </Link>
              </Text>
            </VStack>
          </Form>
        </Center>
      )}
    </Formik>
  );
};

export default Signup;
