import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function AddTransformationTypePage({
  params: { type },
}: SearchParamProps) {
  const transformation = transformationTypes[type];
  const { userId } = auth();
  if (!userId) redirect("/sign-up");

  const user = await getUserById(userId);

  console.log(transformation);
  console.log(user);
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          data={transformation}
          creditBalance={user.creditBalance}
          type={type}
        />
      </section>
    </>
  );
}
