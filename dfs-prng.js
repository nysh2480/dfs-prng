/**
 * DFS-PRNG (Dynamic Frequency Synthesis Pseudorandom Number Generator)
 * * 黄金比 (0x9E3779B9) を核とした位相更新と、
 * 内部状態から動的に生成されたパラメータによる3軸変調合成波を用いた
 * 高性能な擬似乱数生成アルゴリズム。
 */
class DFS_PRNG {
	/**
	 * @param {number} seed - 初期シード値
	 */
	constructor(seed = 123456789) {
		this.state = seed | 0;
		this.PHI = 0x9E3779B9;
		this.HF = [21, 19, 17, 15];
		this.LF = [13, 11, 9, 7];
	}

	/**
	 * 32ビット左循環シフト
	 * @param {number} n - 対象値
	 * @param {number} k - 回転数
	 * @returns {number}
	 */
	rotl(n, k) {
		return (n << k) | (n >>> (32 - k));
	}

	/**
	 * 次の32ビット無符号整数を生成
	 * @returns {number} 0-4294967295
	 */
	next() {
		// 黄金比による位相更新
		this.state = (this.state + this.PHI) | 0;
		const s = this.state;
		// 内部状態から動的に抽出された回転パラメータ
		const r1 = this.HF [ ( s >>> 15 ) & 3];
		const r2 = this.LF [ ( s >>> 9 ) & 3];

		// 可変調合成波による出力生成
		return (
			this.rotl(this.state, r1) ^ 
			~this.rotl(this.state, r2) ^ 
			this.rotl(this.state, r3)
		) >>> 0;
	}
}
