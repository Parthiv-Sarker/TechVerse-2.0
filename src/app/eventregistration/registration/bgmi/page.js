"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Contact from "../../eventDetails/Contact";
import "../styles.css";

const Page = () => {
	const router = useRouter();
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		teamName:"",
		imageUrl: "",
		eventName: "Bgmi",
		participants: [],
	});

	const addParticipant = () => {
		setFormData({
			...formData,
			participants: [...formData.participants, { name: "", email: "" }],
		});
	};

	const removeParticipant = (index) => {
		const updatedParticipants = [...formData.participants];
		updatedParticipants.splice(index, 1);

		setFormData({
			...formData,
			participants: updatedParticipants,
		});
	};

	const handleForm = async (event) => {
		event.preventDefault();
		try {
			setIsLoading(true);
			// For Image Upload..
			const inputFileData = new FormData();
			inputFileData.append("file", file);
			inputFileData.append("upload_preset", "techimage");
			const data = await axios.post(
				"https://api.cloudinary.com/v1_1/techverse/image/upload",
				inputFileData
			);
			const imageUrl = await data.data.secure_url;
			// Send The Data in Backend..
			const res = await axios.post("/api/registration", {
				...formData,
				imageUrl: imageUrl,
			});
			// Check The Backend Response...
			if (res.data.message === "Registration Done.") {
				setIsLoading(false);
				toast.success("Registration Done", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				const id = res.data.data._id;
				router.push(`/eventregistration/eventticket/${id}`);
			} else {
				throw new Error("Backend registration failed");
			}
		} catch (error) {
			setIsLoading(false);
			toast.error("Error to Register.", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			console.error("Error", error);
		}
	};

	const contactDetails = {
		details:
			"The ultimate mobile battleground awaits, where players unite, strategize, and engage in epic battles for victory. Join now!",
		headName: "SURAJIT BHOWMICK",
		headPhoneNo: "6289211990",
		headEmailId: "bhowmicksurajit67@gmail.com",
		coHeadName: "DEBANJAN PAN",
		coHeadPhoneNo: "8016683345",
		coHeadEmailId: "debanjanpan2004@gmail.com",
	};
	const rules = [
		"1.Team should consist of (4+1) members (in case of any emergency).",
		"2.Only one member of a team (Squad or Duo) has to pay the entry fee and for the match or tournaments.",
		"3.If you failed to attend Match in time you will not get any refund.",
		"4.Room ID and password will be shared before 10 minutes of match start time. Players must be ready at the lobby 5 minutes before the start of the match.",
		"5.If any player gets disconnected it will players own responsibility, lobby will not be restarted.",
		"6.Al Maps should be downloaded.",
		"7.Make sure your BGMI Username matches with Registered BGMI username.",
		"8.Players cannot engage with other players in a verbal manner (cuss words, racism, and sexism).",
		"9.Sharing illegal programs and all third-party programs is forbidden.",
		"10.Spamming both in writing and verbally si forbidden.",
		"11.Teaming with opposing teams is forbidden.",
		"12.No emulator players are allowed. External triggers are also.",
		"13.Every Player's App version will be checked by the volunteers before they are about to enter the room."
	]

	return (
		<div className="h-screen w-screen md:h-auto md:flex gap-20 justify-center items-center md:mt-24">
			<Contact params={contactDetails} rules={rules} imgUrl={"/EventPageImg/Bgmi.jpeg"} />
			<div className="flex items-center justify-center text-black font-roboto">
				<div className="form-container p-8 rounded shadow-md w-[30rem]">
					<h1 className=" text-white text-3xl font-semibold text-center mb-4">
						BGMI
					</h1>
					<form onSubmit={handleForm}>
						<div className="mb-4">
							<label className="form-label block">
								Email:
							</label>
							<input
								onChange={(event) => {
									setFormData({
										...formData,
										email: event.target.value,
									});
								}}
								value={formData.email}
								type="email"
								required={true}
								className="form-input w-full p-2"
							/>
						</div>
						<div className="mb-4">
							<label className="form-label block">
								Team Name:
							</label>
							<input
								onChange={(event) => {
									setFormData({
										...formData,
										teamName: event.target.value,
									});
								}}
								value={formData.teamName}
								type="text"
								required={true}
								className="form-input w-full p-2"
							/>
						</div>
						<div className="flex gap-2">
							<div className="mb-4">
								<label className="form-label block">
									Name:
								</label>
								<input
									onChange={(event) => {
										setFormData({
											...formData,
											name: event.target.value,
										});
									}}
									value={formData.name}
									type="text"
									required={true}
									className="form-input w-full p-2"
								/>
							</div>
							<div className="mb-4">
								<label className="form-label block">
									Phone Number:
								</label>
								<input
									onChange={(event) => {
										setFormData({
											...formData,
											phone: event.target.value,
										});
									}}
									value={formData.phone}
									type="phone"
									required={true}
									className="form-input w-full p-2"
								/>
							</div>
						</div>
						{formData.participants.map((participant, index) => (
							<div key={index}>
								<div className="flex gap-1">
									<input
										type="text"
										placeholder={`Participant ${
											index + 1
										} Name`}
										value={participant.name}
										onChange={(e) =>
											setFormData({
												...formData,
												participants:
													formData.participants.map(
														(p, i) =>
															i === index
																? {
																		...p,
																		name: e
																			.target
																			.value,
																  }
																: p
													),
											})
										}
										className="form-input w-full p-2"
									/>
									<input
										type="email"
										placeholder={`Participant ${
											index + 1
										} Email`}
										value={participant.email}
										onChange={(e) =>
											setFormData({
												...formData,
												participants:
													formData.participants.map(
														(p, i) =>
															i === index
																? {
																		...p,
																		email: e
																			.target
																			.value,
																  }
																: p
													),
											})
										}
										className="form-input w-full p-2"
									/>
								</div>
								<button
									type="button"
									onClick={() => removeParticipant(index)}
									className="button-red mt-2 mb-5 w-60 rounded py-2"
								>
									Remove
								</button>
							</div>
						))}
						{formData.participants.length < 5 && (
							<button
								type="button"
								onClick={addParticipant}
								className="button-green button-green mb-10 w-60 rounded py-2 "
							>
								Add Participant
							</button>
						)}
						<h1 className="text-red-600">
							* BGMI: 200/- (Per squad)
						</h1>
						<div className="mb-4 mt-4">
							<Image
								src="/qr_code.jpeg"
								width={200}
								height={200}
								alt="qrcode"
							/>
							<h1 className="text-white">UPI ID: <span className="text-orange-400">8170842884@paytm</span></h1>
						</div>
						<div className="mb-4">
							<label className="form-label block">
								Payment Photo
							</label>
							<input
								onChange={(event) => {
									setFile(event.target.files[0]);
								}}
								accept="image/*"
								type="file"
								name="file"
								required={true}
								className="form-input w-full p-2"
							/>
						</div>
						<button
							type="submit"
							className="button w-full font-bold rounded py-2"
						>
							{isLoading ? "Submitting..." : "Submit"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Page;
