import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  languages: {
    game_engines: { type: [String] },
    backend: { type: [String] }
  },
  total_time_required: { type: String },
  examples: { type: [String] },
  documentation_links: { type: Map, of: String }
});

const Game = mongoose.model("Game", gameSchema);
export default Game;
