"use client";

import { useState } from "react";
import "./style.css";

export function LoginButton() {
  return (
    <div>
      <button type="submit" className="styled-button">
        Log in
      </button>
    </div>
  );
}
