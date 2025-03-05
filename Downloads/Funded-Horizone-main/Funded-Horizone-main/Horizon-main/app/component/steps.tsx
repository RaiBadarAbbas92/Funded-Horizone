export default function FundedTraderSteps() {
  return (
    <div className="relative min-h-screen py-8 sm:py-16 bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0">
        <div className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500/10 to-orange-500/10 rounded-full blur-[50px] sm:blur-[100px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent">
            Growth Path
          </h2>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl text-blue-200/80 px-4">
            Your journey to becoming an elite funded trader
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Lines */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-blue-500" />
          
          {/* Steps Container */}
          <div className="space-y-12 sm:space-y-24">
            {/* Step 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pl-8 sm:pl-0">
              <div className="hidden sm:block w-5/12" />
              <div className="absolute left-4 sm:static w-4 h-4 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 relative">
                <div className="hidden sm:block absolute w-8 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 right-4 top-1/2 -translate-y-1/2" />
              </div>
              <div className="w-full sm:w-5/12 group">
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-blue-500/10 border border-orange-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2 sm:mb-3">01</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Choose Your Path</h3>
                  <p className="text-sm sm:text-base text-blue-200/80">
                    Select from our diverse range of account sizes and trading styles.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pl-8 sm:pl-0">
              <div className="w-full sm:w-5/12 order-2 sm:order-1 group">
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-blue-500/10 border border-orange-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2 sm:mb-3">02</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Prove Your Skills</h3>
                  <p className="text-sm sm:text-base text-blue-200/80">
                    Navigate our evaluation process with trading mastery.
                  </p>
                </div>
              </div>
              <div className="absolute left-4 sm:static w-4 h-4 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 relative order-1 sm:order-2">
                <div className="hidden sm:block absolute w-8 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 left-4 top-1/2 -translate-y-1/2" />
              </div>
              <div className="hidden sm:block w-5/12 order-3" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pl-8 sm:pl-0">
              <div className="hidden sm:block w-5/12" />
              <div className="absolute left-4 sm:static w-4 h-4 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 relative">
                <div className="hidden sm:block absolute w-8 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 right-4 top-1/2 -translate-y-1/2" />
              </div>
              <div className="w-full sm:w-5/12 group">
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-blue-500/10 border border-orange-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2 sm:mb-3">03</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Get Verified</h3>
                  <p className="text-sm sm:text-base text-blue-200/80">
                    Complete verification with consistent performance.
                  </p>
                  <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-xl bg-blue-900/30 border border-blue-500/30">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <span className="text-blue-200 text-xs sm:text-sm">Progress</span>
                      <span className="text-orange-400 font-bold text-xs sm:text-sm">80%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-blue-950 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pl-8 sm:pl-0">
              <div className="w-full sm:w-5/12 order-2 sm:order-1 group">
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-blue-500/10 border border-orange-500/20 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2 sm:mb-3">04</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Start Trading</h3>
                  <p className="text-sm sm:text-base text-blue-200/80">
                    Begin your professional trading career with funding.
                  </p>
                  <div className="mt-3 sm:mt-4">
                    <div className="p-2 sm:p-3 rounded-xl bg-blue-900/30 border border-blue-500/30">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-6 sm:h-8 w-6 sm:w-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <span className="text-orange-400 text-base sm:text-lg font-bold">$</span>
                        </div>
                        <div>
                          <div className="text-white font-bold text-xs sm:text-sm">100% Profit Split</div>
                          <div className="text-blue-200/80 text-[10px] sm:text-xs">First $10,000 earnings</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-4 sm:static w-4 h-4 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 relative order-1 sm:order-2">
                <div className="hidden sm:block absolute w-8 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500 left-4 top-1/2 -translate-y-1/2" />
              </div>
              <div className="hidden sm:block w-5/12 order-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
