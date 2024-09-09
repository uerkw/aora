import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full px-4 justify-center my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-white text-3xl font-pregular mt-7 text-center">
            Sign Up for Aora
          </Text>
          <FormField
            title="Username"
            placeholder="Enter your username"
            value={form.username}
            handleChangeText={(text: string) =>
              setForm({ ...form, username: text })
            }
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(text: string) =>
              setForm({ ...form, email: text })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(text: string) =>
              setForm({ ...form, password: text })
            }
            otherStyles="mt-7"
            isSecureTextEntry={true}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submitForm}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-lg font-pregular text-center">
              Already have an account?
            </Text>
            <Link
              className="text-secondary text-lg font-pmedium"
              href="/sign-in"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
