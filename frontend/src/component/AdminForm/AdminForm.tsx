import React, {JSX, useEffect, useRef, useState} from 'react';
import './AdminForm.css';
import {AxiosError} from 'axios';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Vacation} from "../../models/vacation.model";
import {ErrorModel} from "../../models/error.model";
import {vacationStore} from "../../state/vacation-state";
import {vacationService} from "../../services/vacation-service";
import {appConfig} from "../../utils/app-config";
import Swal from 'sweetalert2';


function AdminForm(): JSX.Element {
    const {register, formState, handleSubmit, reset, getValues} = useForm<Vacation>();
    const navigate = useNavigate();
    const params = useParams();
    let [vacationToUpdate, setVacationToUpdate] = useState<Vacation | undefined>(undefined);
    let [previewImage, setPreviewImage] = useState<string | null>(null);
    const container = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect((): void => {

        async function getSingleVacation(id: number): Promise<void> {
            const storeVacation = vacationStore.getState().vacationList.find((vacation: Vacation): boolean => vacation.id === id);
            try {
                const vacation = storeVacation ?? await vacationService.getVacationById(id);
                if (vacation) {
                    const {startDate, endDate} = vacation;
                    const newVacation: Vacation  = {...vacation,
                        startDate: new Date(startDate).toISOString().split('T')[0],
                        endDate: new Date(endDate).toISOString().split('T')[0]};
                    setVacationToUpdate(newVacation);
                    reset(newVacation);
                }
            } catch (error) {
                Swal.fire({ icon: "error", title: "Error", text: "Failed to load vacation" });
            }
        }

        if (params.id) {
            void getSingleVacation(+params.id);
        }

        const formContainerElement: HTMLDivElement | null =  container.current;
        if (formContainerElement) formContainerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    }, [params.id, reset]);

    async function addVacation(vacation: Vacation): Promise<void>{
        const imageFile: File | undefined = fileInputRef.current?.files?.[0];
        try {
            await vacationService.addVacation(vacation, imageFile);
            navigate("/vacations");
        }
        catch (error) {
            const myErr = error as AxiosError;
            const message: string = (myErr.response?.data as ErrorModel)?.error;
            Swal.fire({ icon: "error", title: "Error", text: message || "Failed to add vacation" });
        }
    }

    async function updateVacation(id: number, vacation: Vacation): Promise<void>{
        const imageFile: File | undefined = fileInputRef.current?.files?.[0];
        try {
            await vacationService.updateVacation(id, vacation, imageFile);
            navigate("/vacations");
        }
        catch (error) {
            const myErr = error as AxiosError;
            const message: string = (myErr.response?.data as ErrorModel)?.error;
            Swal.fire({ icon: "error", title: "Error", text: message || "Failed to update vacation" });
        }
    }

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const file: File | undefined = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (fileReaderEvent): void => {
                const image = fileReaderEvent.target?.result as string;
                setPreviewImage(image);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <form onSubmit={params.id
            ? handleSubmit(vacation => updateVacation(+params.id!, vacation))
            : handleSubmit(addVacation)}>
            <div ref={container} className="form">
                <h1 className="form-headline">
                    {params.id ? "Update Vacation" : "Add Vacation"}
                </h1>
                <div className="form-split">
                    <div className="form-split-1">
                        <div className="form-input-message">
                            destination
                        </div>
                        <input type="text" className="form-destination form-element" {...register("destination",
                            {
                                required: {value: true, message: "Destination is required!"},
                                minLength: {value: 2, message: "Destination must contain at least 2 letters"},
                                maxLength: {value: 20, message: "Can not contain more than 20 letters"}
                            }
                        )}/>
                        {formState.errors.destination && <p>{formState.errors.destination?.message}</p>}
                        <div className="form-input-message">
                            price
                        </div>
                        <input
                            type="number"
                            className="form-price form-element"
                            placeholder="$"
                            {...register("cost", {
                                valueAsNumber: true,
                                required: { value: true, message: "Cost is required!" },
                                min: { value: 1, message: "Price can not be a negative number" },
                                max: { value: 10000, message: "Price can not be more than 10,000$" }
                            })}
                        />
                        {formState.errors.cost && <p>{formState.errors.cost?.message}</p>}
                        <div className="form-input-message">
                            description
                        </div>
                        <textarea className="form-description-texterea form-element" {...register("description",
                            {
                                required: {value: true, message: "Description is required!"},
                                minLength: {value: 2, message: "Description must contain at least 2 letters"},
                                maxLength: {value: 1000, message: "Description can not contain more than 1000 letters"}
                            }
                        )}/>
                        {formState.errors.description && <p>{formState.errors.description?.message}</p>}
                        <div className="form-split-buttons">
                            <button
                                className="form-button form-element"
                                type="submit"
                                >
                                {params.id ? "Update Vacation" : "Add Vacation"}
                            </button>
                        </div>
                    </div>
                    <div className="form-split-2">
                        <div className="form-input-message">
                            start date</div>
                        <input
                            type="date"
                            className="form-date form-element"
                            {...register("startDate", {
                                required: { value: true, message: "Start date is required!" },
                                min: !params.id 
                                ? { value: new Date().toISOString().split('T')[0], message: "Start date cannot be in the past" } 
                                : undefined
                            })}
                        />
                        {formState.errors.startDate && <p>{formState.errors.startDate?.message}</p>}
                        <div className="form-input-message">
                            end date
                        </div>
                        <input
                            type="date"
                            className="form-date form-element"
                            {...register("endDate", {
                                required: { value: true, message: "End date is required!" },
                                validate: endDate => endDate > getValues("startDate") || "End date must be after start date"
                            })}
                        />
                        {formState.errors.endDate && <p>{formState.errors.endDate?.message}</p>}
                        <div className="form-input-message">Upload Image</div>
                        <input
                            type="file"
                            className="form-file form-element"
                            placeholder="Upload Image"
                            name="image"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                        <div className="admin-form-image-container">
                            <img className="admin-form-img" alt="vacation preview" src={ previewImage || (vacationToUpdate?.imageName
                                ? appConfig.uploadsAddress + vacationToUpdate.imageName
                                : "/default-pic.jpg")} />
                        </div>
                        <div className="form-split-buttons">
                            <NavLink
                                className="form-cancel-button"
                                to={"/vacations"}>
                                Cancel
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AdminForm;