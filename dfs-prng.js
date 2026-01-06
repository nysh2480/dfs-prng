/**
 * DFS_PRNG: Dynamic Frequency Synthesis Pseudorandom Number Generator
 * 黄金比位相更新と可変調合成波を用いた擬似乱数生成器
 */
class DFS_PRNG {
	/**
	 * @param {number} seed - 初期シード値
	 */
	constructor(seed = 123456789) {
		this.state = seed | 0;
		// 黄金比定数をクラス内に保持
		this.PHI = 0x9E3779B9;
	}

	/**
	 * 32ビット左循環シフト（ビット回転）
	 * @param {number} n - 対象値
	 * @param {number} k - 回転数
	 * @returns {number}
	 */
	rotl(n, k) {
		return (n << k) | (n >>> (32 - k));
	}

	/**
	 * 次の擬似乱数（32ビット無符号整数）を生成
	 * @returns {number} 0 から 4294967295 までの整数
	 */
	next() {
		// 1. 黄金比による位相更新
		this.state = (this.state + this.PHI) | 0;

		// 2. 内部状態から動的に抽出された回転パラメータ
		const r1 = (15 + (this.state & 7)) & 31;
		const r2 = (7 + ((this.state >>> 3) & 7)) & 31;
		const r3 = (3 + ((this.state >>> 6) & 7)) & 31;

		// 3. 3軸の可変調合成波（rotl ^ ~rotl ^ rotl）
		// ここが設計の核心部：Xorshiftと同等のエントロピーを実現
		return (
			this.rotl(this.state, r1) ^ 
			~this.rotl(this.state, r2) ^ 
			this.rotl(this.state, r3)
		) >>> 0;
	}
}
