import { useState } from "react";
import "./myDogs.css";
import { DOGS_LIST } from "../../utils/data/data";
import AddModal from "../../components/addModal/AddModal";
import Card from "../../components/card/Card";

function MyDogs() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const displayCards = DOGS_LIST.map((singleDog) => {
    return (
      <Card
        key={singleDog.TEXT + Math.random()}
        singleDog={singleDog}
        needEditAndTrash={true}
      ></Card>
    );
  });
  return (
    <div className="mydogs">
      <section className="mydogs-header">
        <h1 className="mydogs-header-headline">Share your amazing dogs!</h1>
        <p className="mydogs-header-subtitle">
          so other people will be able to adopt them
        </p>
      </section>
      <section className="mydogs-dogs">
        <h1 className="mydogs-dogs-headline">
          My Dogs (<span className="headlight">0</span>)
        </h1>
        <div className="mydogs-cards-container">
          <button
            className="mydogs-add"
            onClick={() => {
              setOpenAddModal(true);
            }}
          >
            <span className="mydogs-add-plus">+</span>
          </button>
          {displayCards}
        </div>
      </section>
      <AddModal openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} />
    </div>
  );
}

export default MyDogs;
