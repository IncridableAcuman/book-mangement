import React, { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../interface/user.interface";
import type { LoginData, RegisterData } from "../schema/auth.schema";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  handleRegister: (data: RegisterData) => void;
  handleLogin: (data: LoginData) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (formData: RegisterData) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/register", formData);
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Muvofaqqiyatli ro'yhatdan o'tdingiz");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Ro'yhatdan o'tishda xatolik");
      localStorage.removeItem("accessToken");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formData: LoginData) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("accessToken", data.accessToken);
      toast.success("Tizimga muvofaqqiyatli kirdingiz");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Accountga kirishda xatolik");
      localStorage.removeItem("accessToken");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true)
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Tizimdan chiqdingiz");
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Tizimdan chiqishda xatolik yuz berdi.");
      setLoading(false)
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/user");
        setUser(data);
      } catch (error) {
        console.log(error);
        toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik");
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          loading,
          setLoading,
          handleRegister,
          handleLogin,
          handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("This context only use with AuthProvider");
  return context;
};
