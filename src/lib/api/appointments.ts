import { apiClient } from "./client";
import { apiPath } from "./config";
import type { AppointmentRequest } from "@/lib/types";

export const appointmentsApi = {
	book: (data: AppointmentRequest) =>
		apiClient.post<{ success: boolean; message: string }>(
			apiPath("/api/appointments/book", "/appointment"),
			data,
		),
};
