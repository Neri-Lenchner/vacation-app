import { Bar } from 'react-chartjs-2';
import "./Charts.css";
import {JSX, useEffect, useState, useRef} from "react";
import {DestinationAndFollowersCountModel} from "../../models/destination-and-followers-count.model";
import {followersService} from "../../services/followers-service";
import Swal from 'sweetalert2';

function Charts(): JSX.Element {

    const [vacationDestinationAndFollowersCountList, setVacationDestinationAndFollowersCountList] = useState<DestinationAndFollowersCountModel[]>([]);
    const container = useRef<HTMLDivElement | null>(null);

    useEffect((): void => {
        void (async (): Promise<void> => {
            try {
                const data: DestinationAndFollowersCountModel[] = await followersService.getVacationDestinationWithFollowerCount();
                setVacationDestinationAndFollowersCountList(data);
                const containerElement: HTMLDivElement | null = container.current;
                if (containerElement) containerElement.scrollIntoView();
            } catch {
                Swal.fire({ icon: "error", title: "Error", text: "Failed to load chart data" });
            }
        })();
    }, []);


    function getBackgroundColors(): string[] {
        return vacationDestinationAndFollowersCountList.map((_vacation, i): string => {
            const hue: number = (i * 360) / vacationDestinationAndFollowersCountList.length;
            return `hsl(${hue}, 65%, 55%)`;
        });
    }

    return (
        <div className="Charts-container" ref={container}>
            <Bar
                data={{
                    labels: vacationDestinationAndFollowersCountList.map(vacation => vacation.vacationDestination),
                    datasets: [
                        {
                            label: "Number Of Followers",
                            data: vacationDestinationAndFollowersCountList.map(vacation => vacation.followerCount || 0),
                            backgroundColor: getBackgroundColors(),
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    }
                }}
            />
        </div>
    );
}

export default Charts;