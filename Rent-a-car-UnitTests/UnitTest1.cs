using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Rent_a_car_UnitTests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            Assert.AreEqual(0, 0);
        }

        [TestMethod]
        public void TestMethod2()
        {
            Assert.AreEqual(0.1+0.2, 0.3);
        }
    }
}
