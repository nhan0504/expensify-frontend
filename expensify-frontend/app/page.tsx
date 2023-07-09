"use client";

import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EmployeeHomePage } from "@/components/EmployeeHomePage/EmployeeHomePage";
import { ReviewerHomePage } from "@/components/ReviewerHomePage/ReviewerHomePage";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [user, isLoading]);

  return (
    <main className="background-home">
      {user?.role == "ROLE_EMPLOYEE" && <EmployeeHomePage />}
      {user?.role == "ROLE_REVIEWER" && <ReviewerHomePage />}
    </main>
  );
}
