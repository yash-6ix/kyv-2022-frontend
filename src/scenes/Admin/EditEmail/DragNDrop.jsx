import { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Toggle from "react-toggle";
import { CloseSVG } from "../../../components/SVG";
import emailsService from "../../../services/emails/emailsService";
import updatesService from "../../../services/updates/updatesService";
import { shortenedText, removeTags } from "../../../util/stringUtils";
import Tooltip from '@mui/material/Tooltip'

// const exampleData = {
//     sections: {
//         "section-1": {
//             id: "section-1",
//             title: "Section One",
//             updateIds: ["update-1", "update-2"],
//             className: "bg-brand-white",
//         },
//         "section-2": {
//             id: "section-2",
//             title: "Section Two",
//             updateIds: ["update-3"],
//             className: "bg-brand-white",
//         },
//     },
//     updates: {
//         "update-1": { id: "update-1", content: "Update 1" },
//         "update-2": { id: "update-2", content: "Update 2" },
//         "update-3": { id: "update-3", content: "Update 3" },
//         "update-4": { id: "update-4", content: "Update 4" },
//     },
//     sectionOrder: ["section-1", "section-2"],
// };

const DragNDrop = ({ emailId }) => {
    const [data, setData] = useState({});
    const [unselectedUpdateIds, setUnselectedUpdateIds] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Load the initial state
    useEffect(() => {
        (async () => {
            setLoaded(false);
            await load();
            setLoaded(true);
        })();
        // eslint-disable-next-line
    }, [emailId]);

    const load = async () => {
        const { sections } = await emailsService.getEmail(emailId);
        const updates = await updatesService.fetchUpdates();

        let updatesInEmail = [];

        // Create drag N drop data object based on API data
        let data = {};

        data.updates = {};
        for (const { _id, title, description } of updates) {
            data.updates[_id] = {
                id: _id,
                title,
                description,
                showimg: false,
            };
        }
        // console.log(sections);

        data.sectionOrder = sections.map(({ _id }) => _id);
        data.sections = {};
        for (const { _id, name, updates } of sections) {
            const updateIds = updates.map(({ id, showimg }) => {
                data.updates[id].showimg = showimg;
                return id;
            });

            updatesInEmail.push(...updateIds);

            data.sections[_id] = {
                id: _id,
                title: name,
                updateIds: updateIds,
                className: "bg-brand-neutral-900",
            };
        }

        // Set the updates that are not in the email
        const updatesNotInEmail = updates
            .slice()
            .filter(({ _id }) => !updatesInEmail.includes(_id))
            .map(({ _id }) => _id);

        setUnselectedUpdateIds(updatesNotInEmail);

        // Set the data state
        setData(data);
    };

    // Adding a new section
    const onAddSection = async (sectionName) => {
        // eslint-disable-next-line
        const result = await emailsService.addSection(emailId, sectionName);

        // Reload
        load();
    };
    const onRemoveSection = async (sectionId) => {
        // eslint-disable-next-line
        const result = await emailsService.removeSection(emailId, sectionId);

        // Reload
        load();
    };

    // User starts dragging
    const onDragStart = () => { };

    // User finishes dragging
    const onDragEnd = async (result) => {
        const { source, destination, draggableId, type } = result;

        // If there's no destination just return
        if (!destination) return;

        // Check if the location of the draggable changed, if it didn't just return
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        // Moving Sections
        if (type === "move-section") {
            const newSectionOrder = Array.from(data.sectionOrder);
            newSectionOrder.splice(source.index, 1);
            newSectionOrder.splice(destination.index, 0, draggableId);
            const newData = {
                ...data,
                sectionOrder: newSectionOrder,
            };
            setData(newData);

            // Call reorder section endpoint
            await emailsService.reorderSection(emailId, draggableId, destination.index);

            return;
        }
        // type === "move-update"

        // Unselected -> Unselected
        if (source.droppableId === "unselected" && destination.droppableId === "unselected") {
            // modify
            const newUnselectedUpdateIds = unselectedUpdateIds.slice();
            newUnselectedUpdateIds.splice(source.index, 1);
            newUnselectedUpdateIds.splice(destination.index, 0, draggableId);
            setUnselectedUpdateIds(newUnselectedUpdateIds);

            // No API call, just reflect with state change

            return;
        }
        // Unselected -> Section
        if (source.droppableId === "unselected") {
            const newUnselectedUpdateIds = unselectedUpdateIds.slice();
            const finishSection = data.sections[destination.droppableId];
            const newFinishUpdateIds = Array.from(finishSection.updateIds);

            // Remove update ID from unselected
            newUnselectedUpdateIds.splice(source.index, 1);

            // Add update into new section
            newFinishUpdateIds.splice(destination.index, 0, draggableId);

            const newFinishSection = { ...finishSection, updateIds: newFinishUpdateIds };

            // Make sure to set the showimg to true

            const newData = {
                ...data,
                updates: {
                    ...data.updates,
                    [draggableId]: {
                        ...data.updates[draggableId],
                        showimg: true,
                    },
                },
                sections: {
                    ...data.sections,
                    [newFinishSection.id]: newFinishSection,
                },
            };
            // Set the state
            setData(newData);
            setUnselectedUpdateIds(newUnselectedUpdateIds);

            // Call addUpdate endpoint
            await emailsService.addUpdate(emailId, destination.droppableId, draggableId);

            return;
        }
        // Section -> Unselected
        if (destination.droppableId === "unselected") {
            const newUnselectedUpdateIds = unselectedUpdateIds.slice();
            const startSection = data.sections[source.droppableId];
            const newStartUpdateIds = Array.from(startSection.updateIds);

            // Remove update from section
            newStartUpdateIds.splice(source.index, 1);

            // Add update to unselected updates
            newUnselectedUpdateIds.splice(destination.index, 0, draggableId);

            const newStartSection = { ...startSection, updateIds: newStartUpdateIds };
            const newData = {
                ...data,
                sections: {
                    ...data.sections,
                    [newStartSection.id]: newStartSection,
                },
            };
            // Set the state
            setData(newData);
            setUnselectedUpdateIds(newUnselectedUpdateIds);

            // Call removeUpdate endpoint
            await emailsService.removeUpdate(emailId, source.droppableId, draggableId);

            return;
        }

        const startSection = data.sections[source.droppableId];
        const finishSection = data.sections[destination.droppableId];

        // Moving updates within a section
        if (startSection === finishSection) {
            // New update ids
            const newUpdateIds = Array.from(startSection.updateIds);

            // Remove the update at the source index
            newUpdateIds.splice(source.index, 1);

            // Move it to the destination index
            newUpdateIds.splice(destination.index, 0, draggableId);

            // Update the state with the new section
            const newSection = { ...startSection, updateIds: newUpdateIds };
            const newData = {
                ...data,
                sections: {
                    ...data.sections,
                    [newSection.id]: newSection,
                },
            };
            setData(newData);

            // Call endpoint, reorder update within a section
            await emailsService.reorderUpdate(
                emailId,
                source.droppableId,
                draggableId,
                destination.index
            );

            return;
        } else {
            // Moving update from section to another section
            const newStartUpdateIds = Array.from(startSection.updateIds);
            const newFinishUpdateIds = Array.from(finishSection.updateIds);

            // Remove the update from the start section, at the source index
            newStartUpdateIds.splice(source.index, 1);
            // Add the update back into the finish section, at the destination index
            newFinishUpdateIds.splice(destination.index, 0, draggableId);

            const newStartSection = {
                ...startSection,
                updateIds: newStartUpdateIds,
            };
            const newFinishSection = {
                ...finishSection,
                updateIds: newFinishUpdateIds,
            };
            const newData = {
                ...data,
                sections: {
                    ...data.sections,
                    [newStartSection.id]: newStartSection,
                    [newFinishSection.id]: newFinishSection,
                },
            };

            // Get the showimg
            const showimg = data.updates[draggableId].showimg;

            setData(newData);
            // Remove from source section
            await emailsService.removeUpdate(emailId, source.droppableId, draggableId);

            // Add to destination section
            await emailsService.addUpdate(emailId, destination.droppableId, draggableId, showimg);

            // Reorder
            await emailsService.reorderUpdate(
                emailId,
                destination.droppableId,
                draggableId,
                destination.index
            );
        }

        // Call an endpoint
    };

    if (!loaded) return <></>;

    // Get the unselected updates
    // They belong in a separate non-draggable section
    const unselectedUpdates = unselectedUpdateIds.map((updateId) => data.updates[updateId]);

    const handleShowImgToggle = async (sectionId, updateId) => {
        // Update state

        console.log("1---------", data.updates[updateId]);
        const newData = {
            ...data,
            updates: {
                ...data.updates,
                [updateId]: {
                    ...data.updates[updateId],
                    showimg: !data.updates[updateId].showimg,
                },
            },
        };
        setData(newData);

        // Update backend
        await emailsService.toggleShowImage(emailId, sectionId, updateId);
    };

    console.log("2---------", data.updates);
    return (
        <div className="flex flex-col items-center flex-1 w-full">
            <div className="w-full">
                <NewSectionButton onEnter={onAddSection} />
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-sections" direction="vertical" type="move-section">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {data.sectionOrder.map((sectionId, index) => {
                                    const sectionData = data.sections[sectionId];
                                    const sectionUpdates = sectionData.updateIds.map(
                                        (updateId) => ({
                                            ...data.updates[updateId],
                                            showimg: data.updates[updateId].showimg,
                                        })
                                    );

                                    return (
                                        <Section
                                            data={sectionData}
                                            updates={sectionUpdates}
                                            key={sectionData.id}
                                            index={index}
                                            onRemoveSection={onRemoveSection}
                                            handleShowImgToggle={handleShowImgToggle}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className={`w-full p-6 mb-6 rounded-lg`}>
                        <h1 className="mb-4 text-3xl font-heading text-brand-neutral-900">
                            All Updates (Unselected)
                        </h1>
                        <Droppable droppableId={"unselected"} type="move-update">
                            {(provided, snapShot) => (
                                <div
                                    className={`rounded-lg transition ${snapShot.isDraggingOver
                                        ? "bg-brand-neutral-50"
                                        : "bg-transparent"
                                        }`}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {unselectedUpdates.map((updateData, index) => (
                                        <Update
                                            key={updateData.id}
                                            data={updateData}
                                            index={index}
                                            showImageToggle={false}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

// Email Section component
const Section = ({ data, updates, index, onRemoveSection, handleShowImgToggle }) => {
    return (
        <>
            <Draggable
                isDragDisabled={data.id === "unselected"}
                draggableId={data.id}
                index={index}
            >
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`w-full rounded-lg mb-6  p-6 ${data.className} relative`}
                    >
                        <div className="flex flex-row justify-between">
                            <h1 className="mb-4 text-3xl font-bold font-heading text-brand-white">
                                {data.title}
                            </h1>
                            <button
                                onClick={() => onRemoveSection(data.id)}
                                className="absolute self-start p-3 top-3 right-3 active:text-brand-neutral-200 hover:text-brand-white text-brand-neutral-400"
                            >
                                <CloseSVG
                                    className="w-3 h-3 transition fill-current stroke-current "
                                    strokeWidth={3}
                                />
                            </button>
                        </div>
                        <Droppable droppableId={data.id} type="move-update">
                            {(provided, snapShot) => (
                                <div
                                    className={`rounded-lg transition ${snapShot.isDraggingOver
                                        ? "bg-brand-neutral-800"
                                        : "bg-transparent"
                                        }`}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {updates.map((updateData, index) => (
                                        <Update
                                            key={updateData.id}
                                            data={updateData}
                                            index={index}
                                            onImageToggle={(updateId) => {
                                                handleShowImgToggle(data.id, updateId);
                                            }}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        </>
    );
};

// Email Update component
const Update = ({ data, index, onImageToggle, showImageToggle = true }) => {
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided, snapShot) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`w-full p-4 mb-2 border-2  rounded-lg shadow-lg border-brand-neutral-50 bg-brand-white `}
                    >
                        <h2 className="text-lg font-bold font-heading text-brand-neutral-900">
                            {data.title}
                        </h2>
                        <p className="text-sm ">{shortenedText(removeTags(data.description), 200)}</p>

                        {
                            removeTags(data.description).length > 200 &&
                            <>
                                <br />
                                <Tooltip title={removeTags(data.description)}>
                                    <p className="text-sm text-center"><i>Hover here for full article</i></p>
                                </Tooltip>
                            </>
                        }

                        {
                            showImageToggle && (
                                <div className="flex flex-row items-center justify-end pt-3 mt-3 space-x-2 border-t-2 border-brand-neutral-50">
                                    <h3 className="text-base font-semibold leading-4 text-brand-neutral-800">
                                        Show Image
                                    </h3>
                                    <Toggle
                                        icons={false}
                                        defaultChecked={data.showimg}
                                        onChange={() => onImageToggle(data.id)}
                                    />
                                </div>
                            )
                        }
                    </div>
                );
            }}
        </Draggable >
    );
};

const NewSectionButton = ({ onEnter }) => {
    const inputRef = useRef(null);
    const [name, setName] = useState("");

    const handleEnterPressed = (value) => {
        inputRef.current.blur();
        onEnter(value);
    };

    return (
        <div className="flex flex-row items-center justify-between w-full mb-4 transition rounded-lg bg-brand-neutral-100 hover:bg-brand-neutral-200">
            {/* <PlusSVG className="w-8 h-8 fill-current fill text-brand-neutral-700" /> */}
            <input
                ref={inputRef}
                placeholder="New Email Section"
                className="w-full h-full p-6 text-4xl font-bold text-right bg-transparent cursor-pointer text-brand-neutral-900 font-heading"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.keyCode === 13) handleEnterPressed(e.target.value);
                }}
                onBlur={() => setName("")}
            />
        </div>
    );
};

export default DragNDrop;
