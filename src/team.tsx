import { TeamAvatars } from "./chat";
import { TEAM_PHOTOS } from "./content";
import "./team.css";

const PEOPLE = [
  {
    key: "marco",
    name: "Marco",
    role: "Ingeniería eléctrica e instrumentación",
  },
  { key: "sofia", name: "Sofía", role: "" },
] as const;

/**
 * Retratos de Marco y Sofía. Con una foto cargada en TEAM_PHOTOS se usa la
 * foto; si no, la ilustración con trazo propio. El lugar está preparado.
 */
export function TeamPortraits() {
  return (
    <ul className="portraits" aria-label="Las personas de LUNA">
      {PEOPLE.map((person) => {
        const photo = TEAM_PHOTOS[person.key];
        return (
          <li key={person.key} className="portrait">
            {photo ? (
              <img
                src={photo}
                alt={`${person.name}, de LUNA Proyectos`}
                width="320"
                height="320"
                loading="lazy"
              />
            ) : (
              <span className="portrait-art">
                <TeamAvatars only={person.key} />
              </span>
            )}
            <strong>{person.name}</strong>
            {person.role && <span>{person.role}</span>}
          </li>
        );
      })}
    </ul>
  );
}
