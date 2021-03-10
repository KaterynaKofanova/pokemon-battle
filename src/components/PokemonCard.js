import React from "react";

const PokemonCard = ({ poke, types, opponent }) => {
  // console.log(poke)
  if (!poke || !types || !opponent) {
    return null;
  } else {
    const compareTypes = (types, opponent) => {
      const opponentTypes = opponent.types.map((type) => type.type.name);
      let damages = [];
      for (const type of types) {
        for (const opponentType of opponentTypes) {
          if (type.no_damage_to.map((d) => d.name).includes(opponentType)) {
            damages = damages.concat({
              message: `No damage to ${opponentType} type!!!`,
              color: "red",
            });
          }
          if (type.half_damage_to.map((d) => d.name).includes(opponentType)) {
            damages = damages.concat({
              message: `Half damage to ${opponentType} type`,
              color: "red",
            });
          }
          if (type.double_damage_to.map((d) => d.name).includes(opponentType)) {
            damages = damages.concat({
              message: `Double damage to ${opponentType} type`,
              color: "green",
            });
          }
          if (type.no_damage_from.map((d) => d.name).includes(opponentType)) {
            damages = damages.concat({
              message: `No damage from ${opponentType} type!!!`,
              color: "green",
            });
          }
          if (type.half_damage_from.map((d) => d.name).includes(opponentType)) {
            damages = damages.concat({
              message: `Half damage from ${opponentType} type`,
              color: "green",
            });
          }
          if (
            type.double_damage_from.map((d) => d.name).includes(opponentType)
          ) {
            damages = damages.concat({
              message: `Double damage from ${opponentType} type`,
              color: "red",
            });
          }
        }
      }
      return damages;
    };

    const comparedTypes = compareTypes(types, opponent);
    const total = poke.stats.reduce((a, b) => a + b["base_stat"], 0);
    const average = Math.round(total / poke.stats.length);
    const oppTotal = opponent.stats.reduce((a, b) => a + b["base_stat"], 0);
    const oppAverage = Math.round(oppTotal / poke.stats.length);

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
      <div className="PokemonCard">
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${poke.id}.png`}
          alt={poke.name}
        />
        <h3>{capitalizeFirstLetter(poke.name)}</h3>
        <div>
          Types:{" "}
          {poke.types.map((type) => (
            <b key={type.type.name}>
              {poke.types.length < 2
                ? type.type.name
                : type === poke.types[0]
                ? `${type.type.name} &`
                : type.type.name}{" "}
            </b>
          ))}
        </div>
        <div>
          {comparedTypes.length > 0 ? (
            comparedTypes.map((ct) => (
              <div key={ct.message} style={{ color: ct.color }}>
                {ct.message}
              </div>
            ))
          ) : (
            <div style={{ color: "DodgerBlue" }}>
              No special demages between these types
            </div>
          )}
        </div>
        <div>
          <table className="Stats">
            <colgroup>
              <col className="statName" />
              <col className="statValue" />
            </colgroup>
            <tbody>
              {poke.stats.map((stat) => (
                <tr key={stat.stat.name}>
                  <td>{stat.stat.name}:</td>
                  <td>
                    <div
                      style={{
                        width: `${Math.round((stat.base_stat / 255) * 100)}%`,
                        backgroundColor:
                          stat.base_stat >
                          opponent.stats.find(
                            (s) => s.stat.name === stat.stat.name
                          ).base_stat
                            ? "green"
                            : stat.base_stat <
                              opponent.stats.find(
                                (s) => s.stat.name === stat.stat.name
                              ).base_stat
                            ? "red"
                            : "DodgerBlue",
                      }}
                    >
                      {stat.base_stat}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontWeight: "bold", marginTop: "2rem" }}>
          Total:{" "}
          <span
            style={{
              color:
                total > oppTotal
                  ? "green"
                  : total < oppTotal
                  ? "red"
                  : "DodgerBlue",
            }}
          >
            {total}
          </span>{" "}
          Average:{" "}
          <span
            style={{
              color:
                average > oppAverage
                  ? "green"
                  : average < oppAverage
                  ? "red"
                  : "DodgerBlue",
            }}
          >
            {average}
          </span>
        </div>
      </div>
    );
  }
};

export default PokemonCard;
