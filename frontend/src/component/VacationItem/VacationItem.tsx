import {JSX, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {Follower} from '../../models/follower.model';
import {Vacation} from '../../models/vacation.model';
import {User} from '../../models/user.model';
import {DestinationAndFollowersCountModel} from "../../models/destination-and-followers-count.model";
import {followersService} from '../../services/followers-service';
import { CiCalendarDate } from "react-icons/ci";
import Swal from 'sweetalert2';
import "./VacationItem.css";

interface VacationItemProps {
    user: User;
    vacation: Vacation;
    currentUserFollowedVacations: Follower[];
    destinationAndFollowersCountArr: DestinationAndFollowersCountModel[];
    onDelete: (id: number) => Promise<void>;
}

function VacationItem({vacation, currentUserFollowedVacations, destinationAndFollowersCountArr, user, onDelete}: VacationItemProps): JSX.Element {

    let [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [currentUserFollower, setCurrentUserFollower] = useState<Follower | undefined>(undefined);
    const navigate = useNavigate();

    useEffect((): void => {
        const userIsFollowing: Follower | undefined = currentUserFollowedVacations.find(follower => follower.vacationId === vacation.id);
        setCurrentUserFollower(userIsFollowing);
        setIsFollowing(!!userIsFollowing);
    }, [currentUserFollowedVacations, vacation.id]);

    const startDate: string = new Date(vacation.startDate).toLocaleDateString();
    const endDate: string = new Date(vacation.endDate).toLocaleDateString();

    async function like(): Promise<void> {
        if (isFollowing) {
            if (currentUserFollower) {
                setIsFollowing(false);
                try {
                    await followersService.deleteFollower(currentUserFollower.id!);
                    await followersService.getVacationDestinationWithFollowerCount();
                } catch {
                    setIsFollowing(true);
                    Swal.fire({ icon: "error", title: "Error", text: "Failed to update follow status" });
                }
            }
        } else {
            setIsFollowing(true);
            try {
                const follower = new Follower(user.id!, vacation.id!);
                await followersService.addFollower(follower);
                await followersService.getVacationDestinationWithFollowerCount();
            } catch {
                setIsFollowing(false);
                Swal.fire({ icon: "error", title: "Error", text: "Failed to update follow status" });
            }
        }
    }

    function navigateToAdminForm(): void {
        navigate(`/admin-form/update/${vacation.id}`);
    }

    async function deleteVacation(): Promise<void> {
       await onDelete(vacation.id!);
    }

    return (
        <div className="vacation-item-container">
            <div className="vacation-item-image-container">
                <img className="vacation-item-img" alt={vacation.destination} src={vacation.imageName
                    ? vacation.imageName
                    : "/default-pic.jpg"
                } />
            </div>
            <div className="vacation-item-dates">
                <CiCalendarDate className="vacation-item-calendar-icon"  />
               <div className="vacation-item-start-end-dates">
                  {startDate} - {endDate}
               </div>
            </div>
            <div className="vacation-item-content-container">
                <p className="vacation-item-text">
                    {vacation.description}
                </p>
                <div className="vacation-item-price">
                    $ {Number(vacation.cost).toFixed(0)}
                </div>
            </div>
            <div className="vacation-item-title">
                {vacation.destination}
            </div>
            {user.isAdmin
                ? <div className="vacation-item-admin-clicks">
                    <div
                        className="vacation-item-admin-click-left"
                        onClick={navigateToAdminForm}>
                        &#9998; 
                        <div className="vacation-item-admin-click-left-edit">
                            Edit
                        </div>
                    </div>
                    <div className="vacation-item-admin-click-right"
                         onClick={deleteVacation}>
                       <span>
                          &#128465;&#65038;
                       </span> 
                       <div className="vacation-item-admin-click-right-delete">
                           Delete
                       </div>
                    </div>
                </div>
                : <div
                    onClick={like}
                    className={isFollowing
                        ? "vacation-item-likes-container vacation-item-isFollowing-true"
                        : "vacation-item-likes-container vacation-item-isFollowing-false"}>
                        <div
                            className="vacation-item-likes-container-content">
                            {isFollowing
                                ? "❤️"
                                : "🩶"
                            } Likes {destinationAndFollowersCountArr.find(vacationDestinationAndFollowersCount => vacationDestinationAndFollowersCount.vacationId === vacation.id)?.followerCount ?? 0}
                        </div>
                  </div>
            }
        </div>
    );
}

export default VacationItem;