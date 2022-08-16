import { PublicKey } from "@solana/web3.js";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Api, { SdkItem } from "../api/api";
import { SdkProject } from "../chain/generated/accounts/SdkProject";
import { useAppContext } from "../core/appcontext";

export interface ProjectContextType {
    items: SdkItem[],
    project: PublicKey,
    projectObject: SdkProject,
    triggerFetchUpdates()
}

export const ACTIVE_PROJECT_KEY = "active_project";

export function setActiveProject(project_id: PublicKey, user: PublicKey) {

    if (typeof window !== 'undefined') {
        let cache_key = ACTIVE_PROJECT_KEY + '_' + user.toString();
        window.localStorage.setItem(cache_key, project_id.toString())
    }
}
export function getActiveProject(user: PublicKey): PublicKey | null {

    if (typeof window !== 'undefined') {
        let cache_key = ACTIVE_PROJECT_KEY + '_' + user.toString();

        let addr = window.localStorage.getItem(cache_key);
        if (addr != null) {
            return new PublicKey(addr);
        } else {
            return null;
        }
    }
}

const ProjectContext = createContext({} as ProjectContextType);

function ProjectContextProvider({ children, project }: { children: JSX.Element, project?: PublicKey }) {

    const [items, setItems] = useState<SdkItem[]>([]);

    const [updates, setUpdates] = useState(0);
    const [internal_updates, inc_internal_updates] = useState(0);
    const [projectObject, set_project_object] = useState<SdkProject | null>(null);

    const { connection, project_update_request } = useAppContext();

    const triggerFetchUpdates = () => {
        setUpdates(updates + 1);
    };

    // handle extrnal update requests
    useEffect(() => {
        inc_internal_updates(internal_updates + 1); 
    },[project_update_request])

    useEffect(() => {

        if (project != null) {
            (async () => {
                const api = new Api(project);

                let itemsRaw = await api.items();

                if (itemsRaw != null) {
                    setItems(itemsRaw);
                }

                set_project_object(await SdkProject.fetch(connection, project));

                // trigger context update
                inc_internal_updates(internal_updates + 1);

            })();
        } else {
            set_project_object(null);
        }

    }, [project, updates]);

    const memoedValue = useMemo(() => {

        const context: ProjectContextType = {
            items,
            project,
            triggerFetchUpdates,
            projectObject
        };

        return context;
    }, [internal_updates, items, project]);

    return <ProjectContext.Provider value={memoedValue}>
        {children}
    </ProjectContext.Provider>

}

export function useProjectContext() {

    const project = useContext(ProjectContext)

    if (!project) {
        toast.error(
            "useProjectContext: `project` is undefined. Seems you forgot to wrap your app in ` <ProjectContextProvider /> `",
        )
    }

    return project;
}

export default ProjectContextProvider;
