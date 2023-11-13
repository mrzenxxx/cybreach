import { Matrix, MatrixGenerator, Sequences } from "@/model";
import { GameConfig } from "./game.types";

class Game {
  private static instance: Game;

  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  private seed: string;
  public level: number;

  protected Matrix: Matrix;
  protected Sequences: Sequences;
  protected MatrixGenerator: MatrixGenerator;

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    if (Game.instance) {
      return Game.instance;
    }

    if (canvas.getContext("2d") === null) {
      throw new Error("Canvas context is null");
    }
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.seed = config.seed;
    this.level = config.level;
    console.log("cons");

    this.MatrixGenerator = new MatrixGenerator(this.level, this.seed, {
      minMatrixSize: 3,
      maxMatrixSize: 8,
      minSequencesAmount: 2,
      maxSequencesAmount: 7,
      minSequenceLength: 2,
      minBufferSize: 4,
      maxBufferSize: 8,
      differentMatrixValuesAmount: 5,
      matrixValues: ["A0", "E9", "4C", "8B", "6F"],
      emptyMatrixValue: " ",
    });

    this.Matrix = new Matrix(canvas, this.MatrixGenerator.matrix, {
      dimensions: {
        x: 50,
        y: 50,
        width: 200,
        height: 200,
      },
    });

    this.Sequences = new Sequences(canvas, this.MatrixGenerator.sequences, {
      dimensions: {
        x: 300,
        y: 50,
        width: 200,
        height: 200,
      },
    });

    this.animate = this.animate.bind(this);

    this.init();

    Game.instance = this;
  }

  private init() {
    this.prepareCanvas();
    this.setupEvents();
    requestAnimationFrame(this.animate);
  }

  private prepareCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawBackground();
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private animate() {
    this.clearCanvas();
    this.drawBackground();

    this.Matrix.draw();
    this.Sequences.draw();
    requestAnimationFrame(this.animate.bind(this));
  }

  private drawBackground() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private setupEvents() {
    this.canvas.addEventListener("click", (event: MouseEvent) => {
      console.log(event);
    });
  }
}

export default Game;
