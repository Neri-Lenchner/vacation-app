import {JSX} from 'react';
import './AdminPage.css';
import {followersService} from '../../services/followers-service';
import Swal from 'sweetalert2';

function AdminPage(): JSX.Element {

    async function handleDownloadFollowersList(): Promise<void>  {
        try {
            const vacationData = await followersService.getVacationDestinationWithFollowerCount();
            await followersService.downloadFollowersMapCSV(vacationData);
        } catch (error) {
            await Swal.fire({ icon: "error", title: "Error", text: "Failed to download vacations followers list" });
        }
    };

    return (
        <div className="admin-page-container">
            <h1>Followers Map CSV</h1>
            <button onClick={handleDownloadFollowersList}>
                Click To Download
            </button>
        </div>
    );
}

export default AdminPage;