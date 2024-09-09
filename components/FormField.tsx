import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  placeholder,
  value,
  handleChangeText,
  otherStyles,
  isSecureTextEntry = false,
  ...props
}: any) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-100 w-full h-16 px-4 flex-row bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-base text-white font-pregular"
          placeholder={placeholder}
          value={value}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={isSecureTextEntry && !showPassword}
          {...props}
        />
        {isSecureTextEntry && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
