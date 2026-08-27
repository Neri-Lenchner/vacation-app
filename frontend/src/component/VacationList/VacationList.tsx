import React, {JSX ,useEffect, useState} from "react";
import {Vacation} from '../../models/vacation.model';
import {vacationStore} from '../../state/vacation-state';
import {followersStore} from "../../state/followers-state";
import {authStore} from "../../state/auth-state";
import {followersService} from '../../services/followers-service';
import {vacationService} from '../../services/vacation-service';
import "./VacationList.css";
import CheckBoxItem from "../CheckBoxItem/CheckBoxItem";
import VacationItem from "../VacationItem/VacationItem";
import Pagination from "../Pagination/Pagination";
import {Follower} from "../../models/follower.model";
import {DestinationAndFollowersCountModel} from "../../models/destination-and-followers-count.model";
import {User} from "../../models/user.model";
import {Unsubscribe} from "redux";
import Swal from 'sweetalert2'; 


function VacationList(): JSX.Element {

        const [totalVacations, setTotalVacations] = useState<number>(vacationStore.getState().totalVacations);
        const [page, setPage] = useState<Vacation[]>(vacationStore.getState().vacationList);
        const [currentUserFollowedVacations, setCurrentUserFollowedVacations] = useState<Follower[]>(followersStore.getState().currentUserFollowedVacations);
        const [followersCountList, setFollowersCountList] = useState<DestinationAndFollowersCountModel[]>(followersStore.getState().followersCountList);
        const [currentList, setCurrentList] = useState<Vacation[]>([]);
        const [user, setUser] = useState<User | null>(authStore.getState().user);
        const [showFollowed, setShowFollowed] = useState<boolean>(false);
        const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
        const [showActive, setShowActive] = useState<boolean>(false);


    useEffect(() => {
                void (async () => {
                    try {
                        await vacationService.fetchData(1);
                        await followersService.getFollowersListByUserId(authStore.getState().user!.id!);
                        await followersService.getVacationDestinationWithFollowerCount();
                    } catch {
                        void Swal.fire({ icon: "error", title: "Error", text: "Failed to load data" });
                    }
                })();

                const unSubscribeVacations: Unsubscribe = vacationStore.subscribe((): void => {
                        setTotalVacations(vacationStore.getState().totalVacations);
                        setPage(vacationStore.getState().vacationList);
                });

                const unSubscribeUser: Unsubscribe = authStore.subscribe((): void => {
                    setUser(authStore.getState().user);
                });

                const unSubscribeFollowers: Unsubscribe = followersStore.subscribe((): void => {
                    setCurrentUserFollowedVacations(followersStore.getState().currentUserFollowedVacations);
                    setFollowersCountList(followersStore.getState().followersCountList);
                });

                return (): void => {
                    unSubscribeVacations();
                    unSubscribeUser();
                    unSubscribeFollowers()
                }
        }, []);

    function sortListByDate(vacationList: Vacation[]): Vacation[] {
        return vacationList.sort((a, b): number => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }

    async function handlePaginationChange(pageNumber: number): Promise<void> {
        if (showFollowed || showUpcoming || showActive) {
            const startIndex: number = (pageNumber - 1) * 10;
            const endIndex: number = startIndex + 10;
            setPage(currentList.slice(startIndex, endIndex));
        } else {
            try {
                await vacationService.fetchPage(pageNumber);
            } catch {
                void Swal.fire({ icon: "error", title: "Error", text: "Failed to load page" });
            }
        }
    }

     type CheckboxType = "upcoming" | "followed" | "active";

  async function handleCheckboxes(event: React.ChangeEvent<HTMLInputElement>, type: CheckboxType): Promise<void> {                           
      const isChecked: boolean = event.target.checked;
      setShowUpcoming(type === "upcoming" 
        ? isChecked 
        : false);                                                                            
      setShowFollowed(type === "followed" 
        ? isChecked 
        : false);
      setShowActive(type === "active" 
        ? isChecked 
        : false);                                                                                
      try {                                                                                                                                
          if (isChecked) {
              let list: Vacation[];                                                                                                        
              if (type === "upcoming") {
                list = await vacationService.getUpcomingVacations();
              }
              else if (type === "followed") {
                list = await vacationService.getUsersFollowedVacations(user!.id!);
              }
              else {
                list = await vacationService.getActiveVacations();  
              }                                                                    
              const sortedList: Vacation[] = sortListByDate(list);
              setCurrentList(sortedList);                                                                                                  
              setPage(sortedList.slice(0, 10));             
              setTotalVacations(sortedList.length);                                                                                        
          } else {                                          
              await vacationService.fetchData(1);
              setPage(vacationStore.getState().vacationList);                                                                              
              setTotalVacations(vacationStore.getState().totalVacations);
          }                                                                                                                                
      } catch {
          setShowUpcoming(false);
          setShowFollowed(false);
          setShowActive(false);
          Swal.fire({ 
            icon: "error", 
            title: "Error", 
            text: "Failed to load vacations" 
        });
      }                                                                                                                                    
  }                                                         

  function showUpcomingVacations(event: React.ChangeEvent<HTMLInputElement>): void {
      void handleCheckboxes(event, "upcoming");
  } 
                                                                                                                                         
  function showFollowedVacations(event: React.ChangeEvent<HTMLInputElement>): void {                                                     
      void handleCheckboxes(event, "followed");               
  }

  function showActiveVacations(event: React.ChangeEvent<HTMLInputElement>): void {                                                       
      void handleCheckboxes(event, "active");
  } 

  async function handleDeletePopupWindow(id: number): Promise<void> {
      const result = await Swal.fire({
          title: "Are you sure you want to delete?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Delete"
      });
      if (result.isConfirmed) {
          try {
              await vacationService.deleteVacation(id);
              void Swal.fire({ 
                title: "Deleted!", 
                text: "Your file has been deleted.", 
                icon: "success" 
            });
          } catch {
              Swal.fire({ 
                icon: "error", 
                title: "Error", 
                text: "Failed to delete vacation" 
            });
          }
      }
  }

    return (
        <>
            <div className="Vacation-list-checkbox-container">
                <CheckBoxItem
                    isAdmin={user!.isAdmin}
                    isShown={showFollowed}
                    handleVacationFunction={showFollowedVacations}
                    headLine={"Followed Vacations"}
                />
                <CheckBoxItem
                    isAdmin={false}
                    isShown={showUpcoming}
                    handleVacationFunction={showUpcomingVacations}
                    headLine={"Didn't start yet"}
                />
                <CheckBoxItem
                    isAdmin={false}
                    isShown={showActive}
                    handleVacationFunction={showActiveVacations}
                    headLine={"Active vacations"}
                />
            </div>
            <div className="vacation-list-container">
                {page.map(vacation => (
                    <VacationItem
                        user={user!}
                        vacation={vacation}
                        currentUserFollowedVacations={currentUserFollowedVacations}
                        destinationAndFollowersCountArr={followersCountList}
                        key={vacation.id}
                        onDelete={handleDeletePopupWindow}
                    />
                ))}
            </div>
            <Pagination
                totalVacations={totalVacations}
                handlePaginationChange={handlePaginationChange}
            />
        </>
    );
}

export default VacationList;