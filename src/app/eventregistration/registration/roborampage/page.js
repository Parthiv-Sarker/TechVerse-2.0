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
		eventName: "Robo Rampage",
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
			"In a dystopian future, relentless machines clash, sparks flying, in an epic Robo Rampage, where metal titans battle for dominance and survival.",
		headName: "ABHISHEK VERMA",
		headPhoneNo: "9073805185",
		headEmailId: "av279948@gmail.com",
		coHeadName: "SWAYAN MONDAL",
		coHeadPhoneNo: "6290247709",
		coHeadEmailId: "swayamondal004@gmail.com",
	};

	const rules = [
		{
			title: "Team Specification:",
			description:
				"A team can have maximum of 5 participants. These participants can be of same or different institutes.Every team must have a specific name. Team names that will sound offensive or conflicting will be bound to be rejected.Ateam must specify their Team Representative (Leader) at the time of registration and they MUST submit valid contact details(phone no., email ID etc.) at the time of registration.",
		},
		{
			title: "Bot Specifications:",
			description:
				" The machine's weight should be within 1lb, with a 50% tolerance.There will be no restrictions on the dimensions of the bots). Robots with pneumatic or hydraulic mechanisms or electric lifters are NOT allowed, Only active weapon bots are allowed.",
		},
		{
			title: "Mobility:",
			description:
				"All robots must have easily visible and controlled mobility in order to compete.",
		},
		{
			title: "Robot control requiremnets:",
			description:
				"The robot must be controlled only through a wireless remote, while all power supply must be on board.The team needs either a four-frequency wireless remote-control circuit or two interchangeable dual control circuits to prevent frequency interference. Any wireless system interference won't be eligible for a rematch or affect the results. Toy's remote control systems or commercially available ones are allowed. Nonstandard or self-made systems require organizer approval before use.Teams must pair the wireless remote with the machine before entering the arena. No additional time will be given for this afterward, and failure to connect before entry may result in a team penalty.",
		},
		{
			title: "Battery And Power:",
			description:
				"The machine must be electrically powered; IC engine use is prohibited. Onboard batteries must be sealed and of immobilized-electrolyte types (e.g., gel cells, lithium, NiCad,NiMH, or dry cells). The machine must not exceed 12V DC between any two points.Participants need to bring their own converters for standard power supply according to Indian standard.Use of damaged, non-leak proof batteries may lead to disqualification.Participants must prevent battery terminal short circuits to avoid fire. Failure to do so will result in immediate disqualification.Battery changes are prohibited during the match; only robots with onboard batteries are permitted.The supply from the battery to all the weapons and power systems should qualify",
		},
		{
			title: "Weapon Systems:",
			description:
				"Robots can have any kind of magnetic weapons, cutters, flippers, saws, lifting devices, spinning hammers etc. (if they qualify the criteria mentioned below) as weapons.Following weapons cannot be used:a) Liquid projectiles (Foam, liquefied gases) b) Any kinds of inflammable liquids.Weapons causing invisible damage (Electrical weapons, RF jamming weapons and others). Weapons causing opponents weapons(spinners) to entangle ni them (Chains, Ropes or loose Fabrics).",
		},
	];

	return (
		<div className="h-screen w-screen md:h-auto md:flex gap-20 justify-center items-center md:mt-24">
			<Contact
				params={contactDetails}
				rules={rules}
				imgUrl={"/EventPageImg/Robo Rampage.jpg"}
			/>
			<div className="flex items-center justify-center font-roboto">
				<div className="form-container p-8 rounded shadow-md w-[30rem]">
					<h1 className="text-3xl font-semibold text-center mb-4 text-white">
						Robo Rampage
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
								className="form-input w-full rounded p-2"
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
								className="form-input w-full rounded p-2"
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
									className="form-input w-full rounded p-2"
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
									className="form-input w-full rounded p-2"
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
										className="form-input w-full rounded p-2"
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
										className="form-input w-full rounded p-2"
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
								className="button-green mb-10 w-60 rounded py-2"
							>
								Add Participant
							</button>
						)}
						<h1 className="text-red-600">
							* ROBO RAMPAGE : 200/- (Per team)
						</h1>
						<div className="mb-4 mt-4">
							<Image
								src="/qr_code.jpeg"
								width={200}
								height={200}
								alt="qrcode"
								loading="lazy"
							/>
							<h1 className="text-white">
								UPI ID:{" "}
								<span className="text-orange-400">
									8170842884@paytm
								</span>
							</h1>
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
								className="form-input w-full rounded p-2"
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
