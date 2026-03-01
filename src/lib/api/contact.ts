import { apiClient } from "./client";
import { apiPath } from "./config";

interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	message: string;
}

export const contactApi = {
	submit: (data: ContactFormData) =>
		apiClient.post<{ success: boolean }>(
			apiPath("/api/contact", "/contact-us"),
			data,
		),
};
