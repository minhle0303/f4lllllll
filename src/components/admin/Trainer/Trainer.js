import { useEffect } from "react";
import { useState } from "react";
import { fetchAllTrainer } from "../../../services/TrainerService";
import AllTrainers from "./AllTrainers";
import CreateTrainer from "./CreateTrainer";

function Trainer() {


    const [dataTrainer, setDataTrainer] = useState([]);
    const [filteredData, setFilteredData] = useState(dataTrainer);
    const [isModalOpen, setIsModelOpen] = useState(false);
    useEffect(() => {
        loadTrainers();
    }, []);

    const loadTrainers = async () => {
        const res = await fetchAllTrainer();
        setFilteredData(res.data.data);
        setDataTrainer(res.data.data);
        console.log("s",res.data.data);
        
    }

    return (
        <div style={{ padding: "20px" }}>
            <CreateTrainer
                loadTrainers={loadTrainers}
                isModalOpen={isModalOpen}
                setIsModelOpen={setIsModelOpen}
            />

            <AllTrainers
                loadTrainers={loadTrainers}
                dataTrainer={dataTrainer}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                setIsModelOpen={setIsModelOpen}
            />
        </div>
    )
}

export default Trainer


